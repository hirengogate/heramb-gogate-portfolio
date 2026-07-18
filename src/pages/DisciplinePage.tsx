import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, FolderPlus, Play } from 'lucide-react';
import { Link } from '../lib/router';
import { getDiscipline } from '../data/disciplines';
import { iconMap, type Project } from '../data/portfolio';

// Poster frames live in public/posters/ under the clip's own filename, so a
// video only needs an explicit `poster` when it deviates from that.
function posterFor(src: string): string {
  const file = src.split('/').pop()?.replace(/\.mp4$/, '.webp') ?? '';
  return `/posters/${file}`;
}

// A clip is paused once it is mostly scrolled off screen. Deliberately low so
// that reading the caption under a playing clip doesn't stop it.
const VISIBLE_ENOUGH = 0.25;

// Upper bound on how often scrolling re-measures the clips.
const SCROLL_THROTTLE_MS = 100;

// Leave a clip alone while it owns the screen — pausing a fullscreen or
// picture-in-picture video because the page scrolled behind it is wrong.
function ownsTheScreen(video: HTMLVideoElement): boolean {
  return document.fullscreenElement === video || document.pictureInPictureElement === video;
}

/** How much of the clip's height is inside the viewport, as a 0–1 fraction. */
export function visibleFraction(rect: DOMRect, viewportHeight: number): number {
  if (rect.height <= 0) return 0;
  const visible = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  return Math.max(0, visible) / rect.height;
}

/**
 * Keeps the clips on a discipline page well behaved: only one plays at a time,
 * and scrolling a playing clip out of view pauses it.
 *
 * Deliberately measures geometry on scroll rather than using an
 * IntersectionObserver: the observer only reports at threshold crossings, and
 * on mobile it proved unreliable at actually stopping a clip that had been
 * scrolled past. A direct measurement answers "is this still on screen" the
 * same way every time. It costs nothing while nothing is playing, since the
 * handler bails before touching layout in that case.
 *
 * Listeners are delegated from the page container rather than bound per video,
 * so a clip is covered even if React swaps its element on a re-render.
 */
function useTidyVideoPlayback(root: React.RefObject<HTMLElement | null>, key: string) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const clips = () => Array.from(el.querySelectorAll('video'));

    // 'play' doesn't bubble, but it does capture — so one listener on the
    // container sees every clip start, whenever it was added to the page.
    const onPlay = (event: Event) => {
      const started = event.target;
      for (const other of clips()) {
        if (other !== started && !other.paused) other.pause();
      }
    };

    const pauseWhatIsOffScreen = () => {
      const playing = clips().filter((v) => !v.paused && !ownsTheScreen(v));
      if (playing.length === 0) return; // nothing playing: no layout reads
      for (const video of playing) {
        if (visibleFraction(video.getBoundingClientRect(), window.innerHeight) < VISIBLE_ENOUGH) {
          video.pause();
        }
      }
    };

    // Throttled on a timestamp rather than requestAnimationFrame: rAF is tied
    // to the compositor and does not run in a backgrounded tab, which would
    // silently drop the check. The trailing call makes sure the clip's final
    // resting position is measured once scrolling stops.
    let lastRun = 0;
    let trailing = 0;
    const run = () => {
      lastRun = Date.now();
      pauseWhatIsOffScreen();
    };
    const onScroll = () => {
      if (Date.now() - lastRun >= SCROLL_THROTTLE_MS) run();
      window.clearTimeout(trailing);
      trailing = window.setTimeout(run, SCROLL_THROTTLE_MS);
    };

    el.addEventListener('play', onPlay, true);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });

    return () => {
      window.clearTimeout(trailing);
      el.removeEventListener('play', onPlay, true);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('scroll', onScroll, true);
    };
    // `key` re-binds when the route swaps in a different set of clips.
  }, [root, key]);
}

/**
 * A single UGC clip: poster plus a play button, with nothing fetched until the
 * visitor presses it.
 *
 * The button only exists before the first play. After that the native controls
 * are showing and they draw their own centred play button on a paused clip —
 * on Android Chrome in particular — so keeping ours would stack two play icons
 * on top of each other.
 */
function ReelVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play().catch(() => {
      // Autoplay policy or a decode failure — put the button back so the
      // visitor can try again rather than staring at a dead frame.
      setStarted(false);
    });
  };

  return (
    <div className="reel">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        // Native controls only once it is running; before that the poster and
        // the play button are the whole interface.
        controls={started}
        playsInline
        preload="none"
        aria-label={label}
      />
      {!started ? (
        <button
          type="button"
          className="reel__play"
          onClick={start}
          aria-label={`Play: ${label}`}
        >
          <span className="reel__play-disc">
            <Play size={26} fill="currentColor" strokeWidth={0} />
          </span>
        </button>
      ) : null}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__head">
        <div>
          <h3>{project.title}</h3>
          <p className="project-card__brand">
            {project.period ? `${project.brand} · ${project.period}` : project.brand}
          </p>
        </div>
      </div>
      <p className="project-card__summary">{project.summary}</p>

      {project.metrics && project.metrics.length > 0 ? (
        <div className="project-card__metrics">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      {project.highlights.length > 0 ? (
        <ul>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}

      {project.images && project.images.length > 0 ? (
        <div
          className={
            project.galleryColumns ? 'project-card__gallery is-tiled' : 'project-card__gallery'
          }
          style={
            project.galleryColumns
              ? ({ '--gallery-cols': project.galleryColumns } as React.CSSProperties)
              : undefined
          }
        >
          {project.images.map((image) => (
            <figure key={image.src} className={image.half ? 'is-half' : undefined}>
              <img src={image.src} alt={image.caption ?? project.title} loading="lazy" />
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}

      {project.videos && project.videos.length > 0 ? (
        <div className="project-card__reels">
          {project.videos.map((video) => (
            <figure key={video.src}>
              <ReelVideo
                src={video.src}
                poster={video.poster ?? posterFor(video.src)}
                label={video.caption ?? project.title}
              />
              {video.caption ? <figcaption>{video.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}
    </article>
  );
}

type DisciplinePageProps = {
  slug: string;
};

export function DisciplinePage({ slug }: DisciplinePageProps) {
  const discipline = getDiscipline(slug);
  // Declared before the not-found return so the hook order stays stable.
  const pageRef = useRef<HTMLElement>(null);
  useTidyVideoPlayback(pageRef, slug);

  if (!discipline) {
    return (
      <section className="section page">
        <p className="eyebrow">Not found</p>
        <h2 className="discipline-hero__title">This work area doesn't exist.</h2>
        <Link className="back-link" to="/work">
          <ArrowLeft size={16} />
          Back to all work
        </Link>
      </section>
    );
  }

  const Icon = iconMap[discipline.icon];

  return (
    <section className="section page" ref={pageRef}>
      <Link className="back-link" to="/work">
        <ArrowLeft size={16} />
        All work areas
      </Link>

      <div className={`discipline-hero discipline-hero--${discipline.accent}`}>
        <div className="discipline-hero__icon">
          <Icon size={26} />
        </div>
        <p className="eyebrow">{discipline.eyebrow}</p>
        <h1 className="discipline-hero__title">{discipline.title}</h1>
        <p className="discipline-hero__summary">{discipline.summary}</p>
      </div>

      <div className="discipline-projects">
        {discipline.projects.length > 0 ? (
          discipline.projects.map((project) => <ProjectCard key={project.title} project={project} />)
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">
              <FolderPlus size={26} />
            </div>
            <h3>Case studies coming soon</h3>
            <p>
              This is where the {discipline.title.toLowerCase()} case studies, campaigns, and results will live. Content for this area is being added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

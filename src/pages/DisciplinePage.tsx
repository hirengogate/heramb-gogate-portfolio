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

/**
 * Keeps the clips on a discipline page well behaved: only one plays at a time,
 * and scrolling a playing clip out of view pauses it.
 *
 * Runs off the DOM rather than per-video React state because the videos are
 * spread across sibling ProjectCards and never need to re-render for this —
 * pausing is a direct imperative call on the element.
 */
function useTidyVideoPlayback(root: React.RefObject<HTMLElement | null>, key: string) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const videos = Array.from(el.querySelectorAll('video'));
    if (videos.length === 0) return;

    // Leave a clip alone while it owns the screen — pausing a fullscreen or
    // picture-in-picture video because the page scrolled behind it is wrong.
    const isDetached = (v: HTMLVideoElement) =>
      document.fullscreenElement === v || document.pictureInPictureElement === v;

    const onPlay = (event: Event) => {
      for (const other of videos) {
        if (other !== event.target && !other.paused) other.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.intersectionRatio < VISIBLE_ENOUGH && !video.paused && !isDetached(video)) {
            video.pause();
          }
        }
      },
      { threshold: [0, VISIBLE_ENOUGH] },
    );

    for (const video of videos) {
      video.addEventListener('play', onPlay);
      observer.observe(video);
    }

    return () => {
      for (const video of videos) video.removeEventListener('play', onPlay);
      observer.disconnect();
    };
    // `key` re-binds when the route swaps in a different set of clips.
  }, [root, key]);
}

/**
 * A single UGC clip: poster plus an explicit play button. Nothing is fetched
 * until the visitor presses play, and the button comes back whenever the clip
 * pauses — including when the exclusive-playback and scroll rules pause it —
 * so there is always an obvious way to start it again.
 */
function ReelVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play().catch(() => {
      // Autoplay policy or a decode failure — leave the button up so the
      // visitor can try again rather than staring at a dead frame.
      setPlaying(false);
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
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing ? (
        <button
          type="button"
          // Before first play the whole poster is the target. Once the native
          // controls are showing, shrink the hit area to the disc so a paused
          // clip's scrubber stays reachable.
          className={started ? 'reel__play is-compact' : 'reel__play'}
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

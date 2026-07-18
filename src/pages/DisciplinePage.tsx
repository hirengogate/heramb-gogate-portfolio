import { ArrowLeft, FolderPlus } from 'lucide-react';
import { Link } from '../lib/router';
import { getDiscipline } from '../data/disciplines';
import { iconMap, type Project } from '../data/portfolio';

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
            project.galleryLayout === 'row'
              ? 'project-card__gallery is-row'
              : 'project-card__gallery'
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
              {/* #t=0.1 seeks to the first frame so the clip shows a still
                  instead of a black box before playback. */}
              <video
                src={`${video.src}#t=0.1`}
                controls
                playsInline
                preload="metadata"
                aria-label={video.caption ?? project.title}
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
    <section className="section page">
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

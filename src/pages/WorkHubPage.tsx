import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from '../lib/router';
import { disciplines } from '../data/disciplines';
import { iconMap } from '../data/portfolio';

export function WorkHubPage() {
  return (
    <section className="section page">
      <SectionHeading
        eyebrow="Selected work"
        title="Pick the area you're looking for."
        copy="The work is grouped by discipline so clients and recruiters can jump straight to what's relevant. Each card opens a dedicated page with the case studies behind it."
      />

      <div className="case-grid">
        {disciplines.map((discipline) => {
          const Icon = iconMap[discipline.icon];
          return (
            <Link
              className={`case-card case-card--${discipline.accent} discipline-card`}
              to={`/work/${discipline.slug}`}
              key={discipline.slug}
            >
              <div className="case-card__top">
                <div className="case-card__icon">
                  <Icon size={22} />
                </div>
                <span>{discipline.eyebrow}</span>
              </div>
              <h3>{discipline.title}</h3>
              <p>{discipline.summary}</p>
              <span className="discipline-card__cta">
                View case studies
                <ArrowRight size={15} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

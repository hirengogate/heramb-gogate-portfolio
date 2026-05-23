import { SectionHeading } from '../components/SectionHeading';
import { Testimonials } from '../components/Testimonials';
import type { PortfolioData } from '../data/portfolio';

type ExperiencePageProps = {
  data: PortfolioData;
};

export function ExperiencePage({ data }: ExperiencePageProps) {
  const { experiences, education, certifications } = data;

  return (
    <>
      <section className="section section--split page" id="experience">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline across acquisition, content, research, and operations."
        />

        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.role}`}>
              <div className="timeline-item__meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <div className="timeline-item__body">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section credentials">
        <div>
          <p className="eyebrow">Education</p>
          <h2>{education.degree}</h2>
          <p>
            {education.institution} · {education.period}
          </p>
          <strong>{education.result}</strong>
          <span>{education.note}</span>
        </div>

        <div>
          <p className="eyebrow">Certifications</p>
          <ul className="certification-list">
            {certifications.map((certification) => (
              <li key={certification.title}>
                <strong>{certification.title}</strong>
                <span>{certification.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
    </>
  );
}

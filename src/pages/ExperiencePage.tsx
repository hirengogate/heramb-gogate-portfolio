import { SectionHeading } from '../components/SectionHeading';
import { Testimonials } from '../components/Testimonials';
import { Reveal } from '../lib/reveal';
import type { PortfolioData } from '../data/portfolio';

type ExperiencePageProps = {
  data: PortfolioData;
};

export function ExperiencePage({ data }: ExperiencePageProps) {
  const { experiences, education, certifications } = data;

  return (
    <>
      <section className="section section--split page" id="experience">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Experience"
            title="A timeline across acquisition, content, research, and operations."
          />
        </Reveal>

        <div className="timeline">
          {experiences.map((item) => (
            <Reveal as="article" className="timeline-item" key={`${item.company}-${item.role}`}>
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
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section credentials">
        <Reveal>
          <p className="eyebrow">Education</p>
          <h2>{education.degree}</h2>
          <p>
            {education.institution} · {education.period}
          </p>
          <strong>{education.result}</strong>
          <span>{education.note}</span>
        </Reveal>

        <Reveal delay={90}>
          <p className="eyebrow">Certifications</p>
          <ul className="certification-list">
            {certifications.map((certification) => (
              <li key={certification.title}>
                <strong>{certification.title}</strong>
                <span>{certification.detail}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Testimonials index="02" />
    </>
  );
}

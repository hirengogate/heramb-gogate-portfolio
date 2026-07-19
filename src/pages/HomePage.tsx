import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { BrandStrip } from '../components/BrandStrip';
import { CampaignVisual } from '../components/CampaignVisual';
import { CountUp } from '../components/CountUp';
import { SectionHeading } from '../components/SectionHeading';
import { Testimonials } from '../components/Testimonials';
import { Link } from '../lib/router';
import { Reveal } from '../lib/reveal';
import { disciplines } from '../data/disciplines';
import { iconMap, type PortfolioData } from '../data/portfolio';

type HomePageProps = {
  data: PortfolioData;
  gmailComposeUrl: string;
};

export function HomePage({ data, gmailComposeUrl }: HomePageProps) {
  const { profile, metrics } = data;

  return (
    <>
      <section className="hero" id="top">
        <div className="hero__content">
          <p className="eyebrow">Full Stack Digital Marketer</p>
          <h1>{profile.name}</h1>
          <p className="hero__lead">{profile.role}</p>
          <p className="hero__copy">
            I build acquisition systems where paid media, creative direction, SEO, and content marketing all move toward the same commercial outcome.
          </p>

          <div className="hero__meta" aria-label="Location and focus">
            <span>
              <MapPin size={16} />
              {profile.location}
            </span>
          </div>

          <div className="hero__actions">
            <Link className="button button--primary" to="/work">
              Explore my work
              <ArrowRight size={18} />
            </Link>
            <a className="button button--secondary" href={profile.resume} target="_blank" rel="noreferrer">
              <Download size={18} />
              View resume
            </a>
          </div>
        </div>

        <CampaignVisual />
      </section>

      <BrandStrip />

      {/* Revealed as one block: per-card reveals would expose the hairline-grid
          background between cards mid-animation. The stagger comes from the
          count-up delays instead. */}
      <Reveal as="section" className="metrics-band" aria-label="Selected performance metrics">
        {metrics.map((metric, index) => (
          <article key={metric.label} className="metric-card">
            <strong>
              <CountUp value={metric.value} delay={index * 120} />
            </strong>
            <span>{metric.label}</span>
            <p>{metric.detail}</p>
          </article>
        ))}
      </Reveal>

      <section className="section" id="work">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="What I do"
            title="Work organized by what you're looking for."
            copy="Each area below is its own page. Open one to see the case studies, campaigns, and results behind it."
          />
        </Reveal>

        <div className="case-grid">
          {disciplines.map((discipline, index) => {
            const Icon = iconMap[discipline.icon];
            return (
              <Reveal
                as={Link}
                className={`case-card case-card--${discipline.accent} discipline-card`}
                to={`/work/${discipline.slug}`}
                delay={index * 70}
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
              </Reveal>
            );
          })}
        </div>
      </section>

      <Testimonials index="02" />

      <Reveal as="section" className="contact-section" id="contact">
        <p className="eyebrow">Contact</p>
        <h2>Need someone who can make your marketing efforts actually convert?</h2>
        <p>
          Reach out for growth marketing roles, D2C or Lead Generation performance projects, SEO/content systems, or Social Media Marketing
        </p>

        <div className="contact-actions">
          <a className="button button--dark" href={gmailComposeUrl} target="_blank" rel="noreferrer">
            <Mail size={18} />
            Start a conversation
          </a>
          <Link className="button button--secondary" to="/contact">
            More ways to reach me
            <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </>
  );
}

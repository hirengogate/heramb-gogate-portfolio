import { useState } from 'react';
import { ArrowRight, Download, ExternalLink, Mail, MapPin } from 'lucide-react';
import { CampaignVisual } from './components/CampaignVisual';
import { LockScreen } from './components/LockScreen';
import { SectionHeading } from './components/SectionHeading';
import { iconMap, type PortfolioData } from './data/portfolio';
import './styles.css';

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);

  if (!data) {
    return <LockScreen onUnlock={setData} />;
  }

  const {
    profile,
    metrics,
    caseStudies,
    experiences,
    skillGroups,
    education,
    certifications,
    navItems,
    contactActions,
  } = data;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

  return (
    <main>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Heramb Gogate home">
          HG
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__content">
          <p className="eyebrow">Full Stack Digital Marketer</p>
          <h1>{profile.name}</h1>
          <p className="hero__lead">{profile.role}</p>
          <p className="hero__copy">
            I build acquisition systems where paid media, tracking, creative direction, SEO, and content all move toward the same commercial outcome.
          </p>

          <div className="hero__meta" aria-label="Location and focus">
            <span>
              <MapPin size={16} />
              {profile.location}
            </span>
          </div>

          <div className="hero__actions">
            <a
              className="button button--primary"
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Mail size={18} />
              Start a conversation
            </a>
            <a className="button button--secondary" href={profile.resume} target="_blank" rel="noreferrer">
              <Download size={18} />
              View resume
            </a>
          </div>
        </div>

        <CampaignVisual />
      </section>

      <section className="metrics-band" aria-label="Selected performance metrics">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="section" id="work">
        <SectionHeading
          eyebrow="Selected work themes"
          title="Built around measurable growth, not vanity output."
          copy="The portfolio is organized as marketable proof points: each card connects channel work to revenue, reach, rankings, or operating leverage."
        />

        <div className="case-grid">
          {caseStudies.map((study) => {
            const Icon = iconMap[study.icon];
            return (
              <article className={`case-card case-card--${study.accent}`} key={study.title}>
                <div className="case-card__top">
                  <div className="case-card__icon">
                    <Icon size={22} />
                  </div>
                  <span>{study.eyebrow}</span>
                </div>
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
                <ul>
                  {study.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section--split" id="experience">
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

      <section className="section" id="skills">
        <SectionHeading
          eyebrow="Capabilities"
          title="A full-stack marketing toolkit for modern growth teams."
          copy="Strategy, execution, analytics, creative systems, and AI-enabled workflows in one operating style."
        />

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon];
            return (
              <article className="skill-card" key={group.title}>
                <div className="skill-card__header">
                  <Icon size={20} />
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            );
          })}
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

      <section className="contact-section" id="contact">
        <p className="eyebrow">Contact</p>
        <h2>Need someone who can connect creative output to commercial results?</h2>
        <p>
          Reach out for growth marketing roles, D2C performance projects, SEO/content systems, or campaign operations.
        </p>

        <div className="contact-actions">
          {contactActions.map((action) => {
            const Icon = iconMap[action.icon];
            const isResume = action.href === profile.resume;
            const isEmail = action.href.startsWith('mailto:');
            const href = isEmail ? gmailComposeUrl : action.href;
            return (
              <a
                className="button button--dark"
                href={href}
                key={action.label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={18} />
                {action.label}
                {isResume ? <Download size={16} /> : <ExternalLink size={16} />}
              </a>
            );
          })}
        </div>
      </section>

      <footer className="site-footer">
        <span>{profile.name}</span>
        <a href={gmailComposeUrl} target="_blank" rel="noreferrer">{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
          <ArrowRight size={14} />
        </a>
      </footer>
    </main>
  );
}

export default App;

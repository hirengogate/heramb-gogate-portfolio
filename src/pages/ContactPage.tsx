import { Download, ExternalLink } from 'lucide-react';
import { iconMap, type PortfolioData } from '../data/portfolio';

type ContactPageProps = {
  data: PortfolioData;
  gmailComposeUrl: string;
};

export function ContactPage({ data, gmailComposeUrl }: ContactPageProps) {
  const { profile, contactActions } = data;

  return (
    <section className="contact-section page" id="contact">
      <p className="eyebrow">Contact</p>
      <h2>Need someone who can connect creative output to commercial results?</h2>
      <p>
        Reach out for growth marketing roles, D2C or Lead Generation performance projects, SEO/content systems, or Social Media Marketing
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
  );
}

import { ArrowRight } from 'lucide-react';
import type { Profile } from '../data/portfolio';

type SiteFooterProps = {
  profile: Profile;
  gmailComposeUrl: string;
};

export function SiteFooter({ profile, gmailComposeUrl }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <span className="site-footer__name">{profile.name}</span>
        <div className="site-footer__links">
          <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
      <span className="site-footer__note">
        © {new Date().getFullYear()} · {profile.location}
      </span>
    </footer>
  );
}

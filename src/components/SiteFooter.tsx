import { ArrowRight } from 'lucide-react';
import type { Profile } from '../data/portfolio';

type SiteFooterProps = {
  profile: Profile;
  gmailComposeUrl: string;
};

export function SiteFooter({ profile, gmailComposeUrl }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <span>{profile.name}</span>
      <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
        {profile.email}
      </a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
        <ArrowRight size={14} />
      </a>
    </footer>
  );
}

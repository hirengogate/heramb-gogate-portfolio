// Minimal hash-based router.
//
// Hash routing (rather than the History API) is deliberate: the portfolio is a
// static bundle gated behind an in-memory unlock, so there is no server to
// provide SPA fallbacks for deep links, and a hard refresh always returns to
// the lock screen anyway. Client-side navigation never reloads the page, so the
// decrypted data held in App state survives route changes.

import { useEffect, useState } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

function parseHash(): string {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === '/') {
    return '/';
  }
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export function useHashPath(): string {
  const [path, setPath] = useState(parseHash);

  useEffect(() => {
    const onChange = () => {
      setPath(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}

export function navigate(to: string): void {
  window.location.hash = to;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  children: ReactNode;
};

export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  );
}

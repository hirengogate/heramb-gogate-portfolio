import { Link } from '../lib/router';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
];

type SiteHeaderProps = {
  path: string;
};

function isActive(path: string, to: string): boolean {
  if (to === '/') {
    return path === '/';
  }
  return path === to || path.startsWith(`${to}/`);
}

export function SiteHeader({ path }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand-mark" to="/" aria-label="Heramb Gogate home">
        HG
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={isActive(path, item.to) ? 'is-active' : undefined}
            aria-current={isActive(path, item.to) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

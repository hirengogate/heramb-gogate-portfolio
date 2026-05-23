import { useState } from 'react';
import { LockScreen } from './components/LockScreen';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { useHashPath } from './lib/router';
import { HomePage } from './pages/HomePage';
import { WorkHubPage } from './pages/WorkHubPage';
import { DisciplinePage } from './pages/DisciplinePage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import type { PortfolioData } from './data/portfolio';
import './styles.css';

function renderPage(path: string, data: PortfolioData, gmailComposeUrl: string) {
  if (path === '/') {
    return <HomePage data={data} gmailComposeUrl={gmailComposeUrl} />;
  }
  if (path === '/work') {
    return <WorkHubPage />;
  }
  if (path.startsWith('/work/')) {
    return <DisciplinePage slug={path.slice('/work/'.length)} />;
  }
  if (path === '/experience') {
    return <ExperiencePage data={data} />;
  }
  if (path === '/skills') {
    return <SkillsPage data={data} />;
  }
  if (path === '/contact') {
    return <ContactPage data={data} gmailComposeUrl={gmailComposeUrl} />;
  }
  return <HomePage data={data} gmailComposeUrl={gmailComposeUrl} />;
}

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const path = useHashPath();

  if (!data) {
    return <LockScreen onUnlock={setData} />;
  }

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.profile.email)}`;

  return (
    <main>
      <SiteHeader path={path} />
      {renderPage(path, data, gmailComposeUrl)}
      <SiteFooter profile={data.profile} gmailComposeUrl={gmailComposeUrl} />
    </main>
  );
}

export default App;

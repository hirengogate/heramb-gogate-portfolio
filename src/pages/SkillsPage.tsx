import { SectionHeading } from '../components/SectionHeading';
import { iconMap, type PortfolioData } from '../data/portfolio';

type SkillsPageProps = {
  data: PortfolioData;
};

export function SkillsPage({ data }: SkillsPageProps) {
  const { skillGroups } = data;

  return (
    <section className="section page" id="skills">
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
  );
}

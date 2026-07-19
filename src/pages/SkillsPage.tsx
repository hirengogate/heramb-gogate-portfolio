import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../lib/reveal';
import { iconMap, type PortfolioData } from '../data/portfolio';

type SkillsPageProps = {
  data: PortfolioData;
};

export function SkillsPage({ data }: SkillsPageProps) {
  const { skillGroups } = data;

  return (
    <section className="section page" id="skills">
      <Reveal>
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title="A full-stack marketing toolkit for modern growth teams."
          copy="Strategy, execution, analytics, creative systems, and AI-enabled workflows in one operating style."
        />
      </Reveal>

      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = iconMap[group.icon];
          return (
            <Reveal as="article" className="skill-card" delay={index * 60} key={group.title}>
              <div className="skill-card__header">
                <Icon size={20} />
                <h3>{group.title}</h3>
              </div>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

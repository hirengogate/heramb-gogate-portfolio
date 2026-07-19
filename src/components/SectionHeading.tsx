type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  /** Optional editorial numbering ("01", "02") shown before the eyebrow. */
  index?: string;
};

export function SectionHeading({ eyebrow, title, copy, index }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p>
        {index ? <span className="section-heading__index">{index}</span> : null}
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {copy ? <span>{copy}</span> : null}
    </div>
  );
}

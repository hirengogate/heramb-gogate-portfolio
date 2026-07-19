import { Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from '../lib/reveal';
import { testimonials } from '../data/disciplines';

type TestimonialsProps = {
  /** Optional editorial numbering passed through to the section heading. */
  index?: string;
};

export function Testimonials({ index }: TestimonialsProps) {
  return (
    <section className="section" id="testimonials">
      <Reveal>
        <SectionHeading
          index={index}
          eyebrow="Testimonials"
          title="What clients and founders have said."
        />
      </Reveal>

      {testimonials.length > 0 ? (
        <div className="testimonial-grid">
          {testimonials.map((testimonial, cardIndex) => (
            <Reveal
              as="article"
              className="testimonial-card"
              delay={cardIndex * 80}
              key={testimonial.name}
            >
              <span className="testimonial-card__glyph" aria-hidden="true">
                “
              </span>
              <p>{testimonial.quote}</p>
              <div className="testimonial-card__author">
                <img
                  className="testimonial-card__avatar"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>
                    {testimonial.title}, {testimonial.company}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state__icon">
            <Quote size={24} />
          </div>
          <h3>Testimonials coming soon</h3>
          <p>Letters of recommendation and client testimonials will be added here.</p>
        </div>
      )}
    </section>
  );
}

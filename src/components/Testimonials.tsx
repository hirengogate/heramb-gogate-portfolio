import { Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { testimonials } from '../data/disciplines';

export function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <SectionHeading eyebrow="Testimonials" title="What clients and founders have said." />

      {testimonials.length > 0 ? (
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <Quote size={22} />
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
            </article>
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

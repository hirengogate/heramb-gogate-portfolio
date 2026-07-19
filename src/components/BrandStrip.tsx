// Slow marquee of client brands under the hero.
//
// The list is rendered twice so the CSS loop can translate by exactly half the
// track width for a seamless repeat; the copy is aria-hidden so screen readers
// hear each brand once. Under prefers-reduced-motion the copy is hidden and the
// first list wraps into a static centred row.

import { brands } from '../data/disciplines';

function BrandList({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="brand-strip__list" aria-hidden={hidden ? 'true' : undefined}>
      {brands.map((brand) => (
        <li key={brand}>{brand}</li>
      ))}
    </ul>
  );
}

export function BrandStrip() {
  return (
    <section className="brand-strip" aria-label="Brands I've worked with">
      <div className="brand-strip__track">
        <BrandList />
        <BrandList hidden />
      </div>
    </section>
  );
}

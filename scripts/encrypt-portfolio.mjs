// Setup-time encryption for the portfolio data.
// Encrypts the plaintext portfolio JSON with PBKDF2 (250k iterations, SHA-256)
// and AES-GCM-256, once per passcode, and writes the result to
// src/data/portfolio.encrypted.ts. The browser bundle only ever ships the
// ciphertext, so the portfolio cannot be read without the correct passcode.

import { webcrypto as crypto } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PASSCODES = ['1122', '4213'];
const PBKDF2_ITERATIONS = 250000;

const profile = {
  name: 'Heramb Gogate',
  role: 'Full Stack Digital Marketer for D2C and Real Estate businesses.',
  location: 'Mumbai, India',
  email: 'herambgogate100@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hiren-gogate/',
  resume: 'https://docs.google.com/document/d/18BreTpV9nobpRlqlMLLmdfiSwLwHf-bAH5cdXXwgKKo/edit?usp=sharing',
};

const portfolioData = {
  profile,
  metrics: [
    {
      value: 'INR 1.23M+',
      label: 'Revenue scaled for Kraasa',
      detail: 'Footwear brand growth with 9.14x ROAS on INR 134K ad spend.',
    },
    {
      value: '4.2x',
      label: 'Average blended ROAS',
      detail: 'Delivered across other D2C client accounts.',
    },
    {
      value: '25-40K',
      label: 'Monthly LinkedIn impressions',
      detail: 'Built for brands and founders with 4-6% engagement rates.',
    },
    {
      value: '150+',
      label: 'SEO pages optimized',
      detail: 'Improved crawl depth, metadata, internal links, and rankings.',
    },
  ],
  caseStudies: [
    {
      title: 'Performance Marketing',
      eyebrow: 'Meta Ads + Google Ads + tracking',
      summary:
        'Scaled profitable acquisition for D2C brands with clean attribution, high-volume creative testing, and disciplined budget optimization.',
      highlights: [
        'Kraasa footwear brand: INR 1.23M+ revenue on INR 134K spend at 9.14x ROAS',
        'Average ROAS of 4.2x for other D2C brands',
        '150+ ad creatives generated and tested each month',
        'Built automated reporting workflows using Claude managed agents and Google Sheets to keep data clean and easy to audit',
        'Led brand, competitor, and product-level research to shape acquisition strategy and positioning around real market dynamics',
        'Meta Pixel, CAPI, GTM, GA4, and Shopify tracking',
      ],
      accent: 'teal',
      icon: 'Target',
    },
    {
      title: 'Social Media Marketing',
      eyebrow: 'Content systems + brand voice',
      summary:
        'Directed content calendars, asset production, and platform-specific campaigns across Instagram, Pinterest, Facebook, and LinkedIn.',
      highlights: [
        '500 to 600 purely organic followers in under 60 days on average per brand',
        '25-40K monthly LinkedIn impressions with 4-6% engagement rates for brands and founders',
        '30-50% MoM engagement and audience growth through full-funnel organic content strategies',
        'International school engagement lifted from 1.1% to 3.6% within 90 days',
        'Mid-sized developer profile visits grew 65% and story CTR improved from 1.8% to 4.7%',
        'Managed AOAS social presence with 60K+ followers and an aspirational brand voice',
      ],
      accent: 'wine',
      icon: 'Share2',
    },
    {
      title: 'SEO and Content Engine',
      eyebrow: 'On-page SEO + HARO backlinks',
      summary:
        'Built ranking momentum through technical fixes, page-level optimization, link acquisition, and structured editorial calendars.',
      highlights: [
        '30+ high DA backlinks secured through scalable HARO outreach for healthcare and real estate clients',
        '150+ pages optimized across metadata, H1-H3 hierarchy, keyword density, internal linking, and image alt text',
        'Local SEO lifted for a real estate client via GSC enhancements, WebP image conversion, lazy loading, and reduced TTFB',
        'Organic website traffic increased by 85% within 6 months for an international school through keyword research, on-page SEO, and content optimization',
        '8 high-intent keywords ranked in the top 3 positions on Google, contributing to a 40% increase in qualified organic enquiries',
        'Executed keyword research, on-page SEO, internal linking, and technical audits across 2 client websites to improve search visibility and lead generation',
      ],
      accent: 'gold',
      icon: 'Search',
    },
    {
      title: 'Influencer and Outbound Systems',
      eyebrow: 'Partnerships + acquisition ops',
      summary:
        'Coordinated high-ticket influencer campaigns and built repeatable outbound systems across LinkedIn, email, and Instagram DMs.',
      highlights: [
        '50+ personalized LinkedIn invites, 25+ cold emails, and 20+ Instagram DMs sent per day across outbound systems',
        'High-ticket influencer campaigns coordinated with Riteish Deshmukh and Aditya Roy Kapur for a premium fashion and lifestyle brand',
        'End-to-end talent sourcing, negotiation, and management-team coordination for influencer marketing operations',
        'Managed influencer campaigns with 25+ micro and mid-tier creators (10K-500K followers) across Instagram and YouTube, generating 1M+ cumulative views and strong engagement for client campaigns',
        'Scripted 15+ short-form video briefs, hooks, and talking points for creator partnerships, improving content consistency and helping top-performing collaborations achieve above-average click-through and conversion rates',
        'Led end-to-end influencer execution including creator sourcing, outreach, rate negotiations, content approvals, and performance reporting for campaigns across e-commerce and education clients',
      ],
      accent: 'ink',
      icon: 'Users',
    },
  ],
  experiences: [
    {
      company: 'Attention Not LLP',
      role: 'Digital Marketing Executive',
      location: 'Mumbai, India',
      period: 'Jul 2025 - Present',
      points: [
        'Drove paid acquisition for Kraasa, a footwear brand, and NORI across Meta and Google, scaling Kraasa to INR 1.23M+ revenue with 9.14x ROAS.',
        'Built reliable attribution across GTM, GA4, Shopify, Meta Pixel, and CAPI to reduce cross-channel tracking drift.',
        'Led creative, influencer, organic, and catalog-retargeting workflows while keeping marketing cost near 11% of AOV.',
        'Managed social strategy and content delivery for multiple D2C accounts with 10K+ followers.',
      ],
    },
    {
      company: 'AOAS Inc.',
      role: 'Marketing and Operations Specialist',
      location: 'Mumbai, India',
      period: 'Jul 2025 - Present',
      points: [
        'Built outbound acquisition systems across LinkedIn, email, and Instagram DMs to streamline sales-call booking.',
        'Managed AOAS social media presence with 60K+ followers and maintained an aspirational brand voice.',
        'Executed influencer campaigns with fashion models, actors, and creator management teams for premium brand visuals.',
      ],
    },
    {
      company: 'Highgrowthers Agency',
      role: 'Digital Marketing Executive',
      location: 'Thane, India',
      period: 'Jan 2025 - Jun 2025',
      points: [
        'Implemented HARO backlink strategies for healthcare and real-estate clients, securing 30+ high DA backlinks.',
        'Optimized on-page SEO for 150+ pages across metadata, heading structure, keyword density, internal links, and alt text.',
        'Managed content calendars for 7+ clients and coordinated 70+ pieces of content with designers and editors.',
      ],
    },
    {
      company: 'Abhitech Energycon Ltd',
      role: 'Digital Marketing Specialist',
      location: 'Mumbai, India',
      period: 'Apr 2024 - Nov 2024',
      points: [
        'Grew LinkedIn company followers by 600+ through niche group engagement, discussion prompts, and consistent posting.',
        'Achieved a 28% open rate for a C-suite email campaign promoting an international B2B exhibition in Jakarta.',
      ],
    },
    {
      company: 'Bizlytik Intelligence LLP',
      role: 'Market Research Intern',
      location: 'Mumbai, India',
      period: 'Feb 2023 - May 2023',
      points: [
        'Contributed to secondary market research for a skincare industry forecast report projected through 2030.',
        'Developed presentation material that supported client and internal research discussions.',
      ],
    },
  ],
  skillGroups: [
    {
      title: 'Growth Strategy',
      icon: 'LineChart',
      items: [
        'Full-stack performance marketing',
        'D2C community building',
        'Lead generation',
        'Market research',
        'GTM strategy',
        'Competitor research',
        'Product positioning',
        'Outbound systems',
      ],
    },
    {
      title: 'Paid Media',
      icon: 'Megaphone',
      items: [
        'Google Ads',
        'Meta Ads',
        'LinkedIn Ads',
        'Pinterest Ads',
        'Catalog retargeting',
        'Budget optimization',
        'Creative testing',
        'CPA optimization',
      ],
    },
    {
      title: 'SEO and Analytics',
      icon: 'BarChart3',
      items: [
        'Full-stack SEO',
        'SEMrush',
        'Ahrefs',
        'Google Search Console',
        'GA4',
        'Shopify analytics',
        'GTM',
        'Reporting audits',
      ],
    },
    {
      title: 'Content and Brand',
      icon: 'PenLine',
      items: [
        'Copywriting',
        'Content writing',
        'Social media calendars',
        'Influencer marketing',
        'Email marketing',
        'UGC briefs',
        'Brand voice',
        'Creative direction',
      ],
    },
    {
      title: 'AI and Creative Tools',
      icon: 'Brain',
      items: [
        'Claude',
        'Agentic Automation',
        'Google Sheets workflows',
        'Midjourney',
        'Canva Advanced',
        'Madgicx',
        'Office 365',
        'AI-driven UGC concepts',
      ],
    },
  ],
  education: {
    institution: 'University of Mumbai',
    degree: 'Bachelor of Management Studies in Marketing',
    period: '2020 - 2023',
    result: '8.92 CGPA / 3.5 GPA',
    note: 'Studied marketing principles, GTM strategy, market research, branding, and strategic decision-making.',
  },
  certifications: [
    {
      title: 'Digital Marketing and E-commerce by Google',
      detail:
        'Full-stack digital marketing and e-commerce foundations across acquisition, analytics, and online growth.',
    },
    {
      title: 'Market Research Specialization by University of Pennsylvania',
      detail:
        'Advanced market research methods, data analysis, customer understanding, and strategy-backed decision-making.',
    },
    {
      title: 'Business Analysis Foundation by NASBA',
      detail:
        'Requirements elicitation, workflow modeling, stakeholder assessment, and translating business needs into functional plans.',
    },
  ],
  navItems: [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  contactActions: [
    { label: 'Email Heramb', href: `mailto:${profile.email}`, icon: 'Mail' },
    { label: 'LinkedIn', href: profile.linkedin, icon: 'BriefcaseBusiness' },
    { label: 'Resume', href: profile.resume, icon: 'Sparkles' },
  ],
};

function toBase64(buffer) {
  return Buffer.from(buffer).toString('base64');
}

async function encryptWithPasscode(plaintext, passcode) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passcode),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext),
  );

  return {
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(new Uint8Array(ciphertext)),
  };
}

async function main() {
  const plaintext = JSON.stringify(portfolioData);

  const blobs = [];
  for (const passcode of PASSCODES) {
    blobs.push(await encryptWithPasscode(plaintext, passcode));
  }

  const fileContents = `// AUTO-GENERATED by scripts/encrypt-portfolio.mjs. DO NOT EDIT BY HAND.
// Re-run \`node scripts/encrypt-portfolio.mjs\` to regenerate.
//
// The portfolio data is encrypted with PBKDF2 (SHA-256, ${PBKDF2_ITERATIONS} iterations)
// and AES-GCM-256. Each blob below is the same plaintext encrypted under a different
// passcode. Browser code attempts AES-GCM decryption against each blob in turn; the
// passcode is correct only if a blob authenticates. No plaintext or passcode lives
// anywhere in this bundle.

export type EncryptedBlob = {
  salt: string;
  iv: string;
  ciphertext: string;
};

export const PBKDF2_ITERATIONS = ${PBKDF2_ITERATIONS};

export const ENCRYPTED_BLOBS: EncryptedBlob[] = ${JSON.stringify(blobs, null, 2)};
`;

  const outPath = join(__dirname, '..', 'src', 'data', 'portfolio.encrypted.ts');
  writeFileSync(outPath, fileContents, 'utf8');

  // Verify round-trip — decrypt each blob with its passcode and confirm it matches.
  for (let i = 0; i < PASSCODES.length; i++) {
    const decoded = await verifyDecrypt(blobs[i], PASSCODES[i]);
    if (decoded !== plaintext) {
      throw new Error(`Round-trip failed for passcode at index ${i}`);
    }
  }

  // Verify that a wrong passcode fails to decrypt (AES-GCM should throw).
  let wrongFailed = false;
  try {
    await verifyDecrypt(blobs[0], '0000');
  } catch {
    wrongFailed = true;
  }
  if (!wrongFailed) {
    throw new Error('Wrong passcode unexpectedly decrypted blob 0');
  }

  console.log(`Wrote encrypted portfolio (${blobs.length} blobs) to ${outPath}`);
  console.log('Round-trip verification passed for all passcodes; wrong-passcode rejection confirmed.');
}

async function verifyDecrypt(blob, passcode) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const salt = Buffer.from(blob.salt, 'base64');
  const iv = Buffer.from(blob.iv, 'base64');
  const ciphertext = Buffer.from(blob.ciphertext, 'base64');

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passcode),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );

  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );

  return dec.decode(plaintext);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

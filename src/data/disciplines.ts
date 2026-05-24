// Work segmentation — structure only.
//
// These are the discipline/service buckets clients and recruiters browse. Each
// becomes its own routed page at #/work/<slug>. Only category-level structure
// lives here (titles + one-line summaries); it is not sensitive, so unlike the
// portfolio body it is not encrypted.
//
// `projects` is intentionally EMPTY for now. Add case studies (Kraasa, NORI,
// e-Drishyam, Instasculpt, the AOAS outbound system, etc.) into the relevant
// discipline's `projects` array as that content is written up.

import type { Discipline, Project, Testimonial } from './portfolio';

const kraasaSocial: Project = {
  title: 'Organic + Boosted Social Growth for a D2C Footwear Brand',
  brand: 'Kraasa · Attention Not',
  period: 'Jul 2025 – May 2026',
  summary:
    'Grew Kraasa’s Instagram from a small base into an engaged community through a brand-aligned content engine — product, lifestyle, activity, and meme formats — backed by selective low-budget boosting. Part of managing social end-to-end for a portfolio of D2C fashion and lifestyle brands.',
  metrics: [
    { value: '14.1K', label: 'Instagram followers' },
    { value: '4.3x', label: 'Follower growth' },
    { value: '856.1K', label: 'Reach (Nov–Dec ’25)' },
    { value: '437.7K', label: 'Content views' },
    { value: '11.5K', label: 'Content interactions' },
  ],
  highlights: [
    'Managed Instagram end-to-end for 5 D2C fashion and lifestyle brands, building brand-specific content strategies aligned to each brand’s positioning, aesthetics, and pricing tier.',
    'Grew Kraasa from 3,290 to 14.1K followers (4.3x) between July 2025 and May 2026, shipping 240+ posts on a consistent content calendar.',
    'Ran a hybrid organic + low-budget boosting model — boosting only high-performing posts to accelerate reach without distorting audience quality (no giveaways or spam).',
    'Mixed formats to match intent: product hero creatives, aspirational lifestyle shoots, community/activity angles (Strava), and meme content for relatability and reach.',
    'Optimized hooks, creatives, captions, and posting cadence from performance signals — driving 856.1K reach, 437.7K views (145K organic / 292K boosted), and 11.5K interactions in a two-month window.',
  ],
  images: [
    {
      src: '/social/kraasa-ig-jul2025.jpeg',
      caption: 'Kraasa Instagram — July 2025: 3,290 followers, 100 posts.',
      half: true,
    },
    {
      src: '/social/kraasa-ig-may2026.jpeg',
      caption: 'Kraasa Instagram — May 2026: 14.1K followers, 341 posts.',
      half: true,
    },
    {
      src: '/social/kraasa-ig-insights.webp',
      caption: 'Kraasa Instagram insights — 437.7K views, 856.1K reach, and 11.5K interactions (Nov–Dec 2025).',
    },
    {
      src: '/social/kraasa-static-strava.webp',
      caption: 'Static — comfort and performance angle with a Strava activity overlay.',
    },
    {
      src: '/social/kraasa-static-movewith.webp',
      caption: 'Static — aspirational lifestyle product creative.',
    },
    {
      src: '/social/kraasa-static-meme.webp',
      caption: 'Static — meme format built for relatability and reach.',
    },
  ],
};

const amuktiSocial: Project = {
  title: 'Festive-First Content & Brand Positioning for an Ethnic-Wear Label',
  brand: 'Amukti · Attention Not',
  period: '2025',
  summary:
    'Built festive-led content and brand positioning for Amukti, an ethnic and festive-wear label — aligning aspirational, editorial creative direction to the brand’s premium aesthetic to grow a relevant, engaged audience organically.',
  metrics: [
    { value: '500–600', label: 'New followers added' },
    { value: 'Organic + boosted', label: 'Growth model' },
  ],
  highlights: [
    'Led festive-first content and brand positioning aligned to Amukti’s premium ethnic-wear aesthetic and pricing tier.',
    'Built brand-specific creatives — editorial festive shoots and emotive “Not just worn, felt” storytelling — rather than generic product posts.',
    'Grew a relevant, engaged audience organically (~500–600 new followers), supported by selective low-budget boosting instead of giveaways or spam.',
    'Planned and executed a consistent festive-season content calendar across product, model, and lifestyle formats.',
  ],
  images: [
    {
      src: '/social/amukti-static-felt.webp',
      caption: 'Static — “Not just worn, felt” festive editorial creative.',
    },
    {
      src: '/social/amukti-static-festive.webp',
      caption: 'Static — “Own the festive you step into” campaign creative.',
    },
  ],
};

// Cross-listed case study: e-Drishyam was an Organic SMM + Meta Ads campaign,
// so it appears under both Performance Marketing and Social Media Marketing.
const eDrishyam: Project = {
  title: 'Ad Creative & Content Strategy for a Film School Brand',
  brand: 'e-Drishyam Film School · High Growthers',
  period: '2025',
  summary:
    'Led the creative direction and content strategy behind a Marathi short film and the founder’s filmmaking coaching — building the regional-language creatives, storytelling, and content calendar that powered the brand’s reach across paid and organic.',
  metrics: [
    { value: '270%', label: 'Increase in inbound inquiries' },
    { value: '529.92%', label: 'Engagement rate (60 days)' },
    { value: '214K', label: 'Top content views' },
    { value: '10', label: 'Festival nominations' },
    { value: '6', label: 'Festival awards' },
  ],
  highlights: [
    'Owned the content strategy and Marathi regional-language creative direction — building audience-specific messaging and emotional storytelling hooks for the short film and coaching brand.',
    'Designed and produced the ad creatives and organic content (reels, posters, and posts) that the campaigns ran on.',
    'Planned and executed the content calendar with 25+ high-effort posts and 4 influencer collaborations to keep reach consistent.',
    'Creative and content work pushed top pieces to 152K–214K views and lifted the page’s engagement rate to 529.92% over 60 days.',
    'The creative-led approach fueled 10 festival nominations, 6 awards, and a 270% increase in inbound filmmaking-coaching inquiries.',
  ],
  images: [
    {
      src: '/performance/edrishyam-creative-design.png',
      caption: 'Ad creative — “Design like a Pro, Animate like a Master” for e-Drishyam’s design and animation courses.',
    },
    {
      src: '/performance/edrishyam-republic-day.png',
      caption: 'Occasion creative — Republic Day post in the brand’s regional storytelling style.',
    },
    {
      src: '/performance/edrishyam-analytics.png',
      caption: 'Instagram analytics — 529.92% engagement rate with 5.3K average likes across the campaign.',
    },
  ],
};

export const disciplines: Discipline[] = [
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    eyebrow: 'Paid media · Meta & Google Ads',
    summary:
      'Scaling profitable acquisition for D2C brands through full-funnel paid campaigns, high-volume creative testing, and disciplined budget optimization.',
    icon: 'Target',
    accent: 'teal',
    projects: [
      {
        title: 'Scaling Profitable Meta Ads for a D2C Footwear Brand',
        brand: 'Kraasa',
        period: 'Jul 2025 – Dec 2025',
        summary:
          'Scaled online purchases for Kraasa on Meta (Facebook & Instagram) while holding customer acquisition cost low and protecting profitability — through a conversion-first account structure, high-volume creative testing, and aggressive budget reallocation toward winners.',
        metrics: [
          { value: '₹1.22M+', label: 'Revenue generated' },
          { value: '9.14x', label: 'Blended purchase ROAS' },
          { value: '1,148', label: 'Purchases' },
          { value: '₹116.80', label: 'Cost per purchase' },
          { value: '₹1.34L', label: 'Total ad spend' },
          { value: '10.9%', label: 'Cost as % of AOV' },
        ],
        highlights: [
          'Built a conversion-first account structure with all primary campaigns optimized for Website Purchases rather than upper-funnel vanity metrics.',
          'Concentrated spend on 10+ high-intent audiences across Metro and Tier-1 cities with higher purchasing power.',
          'Balanced scale and efficiency with a bid-strategy mix of target-ROAS and ASC+ campaigns.',
          'Ran multiple creative buckets in parallel: AI UGC (HeyGen avatars), AI product banners (Nano Banana), influencer video, and product-specific static and motion creatives.',
          'Reallocated budget aggressively toward low-CPA, high-ROAS campaigns and capped or deprioritized underperformers early.',
          'Top campaigns delivered 10–11.7x ROAS — AI Banners returned 11.11x on 261 purchases at a ₹89 cost per purchase.',
        ],
        images: [
          {
            src: '/performance/kraasa-ads-reach.png',
            caption: 'Meta Ads Manager — Kraasa campaigns by reach, impressions, and results.',
          },
          {
            src: '/performance/kraasa-ads-roas.webp',
            caption: 'Meta Ads Manager — Kraasa cost per purchase, purchase ROAS, and amount spent.',
          },
        ],
      },
      {
        title: 'Full-Funnel Meta & Google Performance for a Premium D2C Brand',
        brand: 'NORI',
        period: 'Sep 2025 – Jan 2026',
        summary:
          'Drove profitable paid acquisition for NORI across Meta and Google Ads with a full-funnel CBO structure, continuous creative testing, and high-intent search — scaling hardest through Black Friday and end-of-year sale periods on a clean, reliably attributed tracking setup.',
        metrics: [
          { value: '₹9.10L+', label: 'Meta attributed revenue' },
          { value: '12.1x', label: 'Top campaign ROAS' },
          { value: '6–8.8x', label: 'Average ROAS' },
          { value: '39', label: 'Campaigns managed' },
          { value: '51.85%', label: 'Google Ads traffic share' },
        ],
        highlights: [
          'Structured Meta as full-funnel CBO: top-funnel video and awareness, mid-funnel engagement and video viewers, bottom-funnel product retargeting and catalog ads.',
          'Ran continuous creative testing across static, video, review, and product-feature angles to keep CPMs efficient and CTR high (5%+ on top campaigns).',
          'Layered Google Ads with high-intent Search and shopping-focused campaigns, shifting budget toward keywords with the strongest CTR and engagement.',
          'Top creative combinations (Static + Video CBO) returned 12.11x ROAS, with multiple campaigns sustaining 9–11x.',
          'Google Ads became the single largest traffic driver at 51.85% of sessions.',
          'Backed by GTM, GA4, Meta Pixel, and Conversions API for clean, deduplicated cross-channel ROAS reporting.',
        ],
        images: [
          {
            src: '/performance/nori-ads-roas.png',
            caption: 'Meta Ads Manager — NORI campaigns by CTR, CPC, purchase ROAS, and conversion value.',
          },
          {
            src: '/performance/nori-ads-custom.png',
            caption: 'Meta Ads Manager — NORI custom performance view across 39 campaigns.',
          },
        ],
      },
      eDrishyam,
    ],
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    eyebrow: 'Organic growth · Boosted content',
    summary:
      'Growing engaged, on-brand audiences across Instagram, Facebook, and LinkedIn with content systems, calendars, and low-budget boosting.',
    icon: 'Share2',
    accent: 'wine',
    projects: [kraasaSocial, amuktiSocial, eDrishyam],
  },
  {
    slug: 'seo',
    title: 'SEO',
    eyebrow: 'Technical · On-page · Off-page',
    summary:
      'Building organic visibility through technical fixes, page-level optimization, structured content, and high-authority backlink acquisition.',
    icon: 'Search',
    accent: 'gold',
    projects: [
      {
        title: 'Technical + Off-Page SEO for an Aesthetics Clinic',
        brand: 'Instasculpt · High Growthers',
        period: '2025',
        summary:
          'Drove organic visibility for Instasculpt, a non-invasive body-sculpting clinic, through clean technical SEO, page-speed and Core Web Vitals work, and scalable high-authority backlink building.',
        metrics: [
          { value: '402', label: 'Backlinks (78% quality)' },
          { value: '33 / 39', label: 'Domain / Page Authority' },
          { value: '1%', label: 'Spam score' },
          { value: '13K', label: 'Search impressions (3 mo)' },
          { value: '21.6', label: 'Avg. Google position' },
          { value: '<2s', label: 'Landing-page load time' },
        ],
        highlights: [
          'Technical health: clean canonicalization, no indexing blockers, SSL with HTTPS redirect, and a valid robots.txt — a fully crawlable, index-ready site.',
          'Off-page authority: scaled to 402 backlinks (315 quality, 78%) at a low 1% spam score, lifting Domain Authority to 33 and Page Authority to 39 via guest posts and co-marketing with allied health businesses.',
          'Page experience: held total download size to ~4.9MB and tuned Core Web Vitals to sub-2s load times on key landing pages, cutting bounce rate by 11%.',
          'On-page and local: optimized metadata, schema, and location tagging, and refined the Google Business Profile (Q&As, patient reviews) for local discovery.',
          'Social signals: A+ social health with the Facebook page linked, Open Graph tags, and Pixel installed.',
          'Tracked in Search Console: 13K impressions and 250 clicks over 3 months at 1.9% CTR and an improving average position (21.6), with a roadmap toward top-3 local rankings and 200+ monthly organic leads.',
        ],
        images: [
          {
            src: '/seo/instasculpt-gsc.jpg',
            caption: 'Google Search Console — 250 clicks, 13K impressions, 1.9% CTR, avg. position 21.6 (3 months).',
          },
          {
            src: '/seo/instasculpt-technical.png',
            caption: 'Technical SEO — clean canonical, no indexing blockers, SSL, HTTPS redirect, and robots.txt.',
            half: true,
          },
          {
            src: '/seo/instasculpt-pagesize.png',
            caption: 'Page speed — total download size held to ~4.9MB for fast loads.',
            half: true,
          },
          {
            src: '/seo/instasculpt-social.png',
            caption: 'Social signals — A+ with Facebook page linked, Open Graph tags, and Pixel.',
          },
        ],
      },
    ],
  },
  {
    slug: 'outbound-lead-generation',
    title: 'Outbound & Lead Generation',
    eyebrow: 'Cold email · DMs · Automation',
    summary:
      'Repeatable outbound systems that book qualified conversations through hyper-personalized cold email and DM at scale, without burning sender reputation.',
    icon: 'Mail',
    accent: 'teal',
    projects: [
      {
        title: 'Predictable Cold Outbound Engine for a Production Agency',
        brand: 'AOAS',
        period: '2025',
        summary:
          'Designed and built an outbound system that consistently books conversations with founders, brand managers, and model agencies — hyper-personalized cold email and DM at deliberately low daily volume, engineered for reply quality and sender reputation rather than mass spray.',
        metrics: [
          { value: '~8%', label: 'Reply rate (vs 2–4% benchmark)' },
          { value: '45/day', label: 'Outbound touchpoints' },
          { value: '25/day', label: 'Hyper-personalized emails' },
          { value: '20/day', label: 'Hyper-personalized DMs' },
        ],
        highlights: [
          'Built an end-to-end outbound infrastructure to reach founders, marketing heads, brand managers, and model agencies — without sounding like generic cold spam.',
          'Built ICP-focused lead lists in Apollo with strict filters (company size, role seniority, recent activity signals), then manually pruned low-intent prospects before outreach — “fewer leads, higher intent” over mass scraping.',
          'Engineered a personalization layer: each message tied to the prospect’s brand, recent campaigns, and public work, with contextual hooks and natural-language variation so emails and DMs read 1-to-1, not as sequences.',
          'Automated lead enrichment and cross-tool data syncing with Phantombuster, keeping daily volume deliberately low to protect domain trust and inbox placement.',
          'Delivered a ~8% reply rate (well above the 2–4% cold benchmark) and consistent inbound conversations with decision-makers — a predictable acquisition channel with zero dependency on ads or inbound content.',
        ],
      },
    ],
  },
  {
    slug: 'influencer-marketing',
    title: 'Influencer Marketing',
    eyebrow: 'Creator sourcing · Campaigns',
    summary:
      'Sourcing, vetting, and managing the right creators and models for fashion shoots and campaigns, with a focus on commercial fit over follower count.',
    icon: 'Users',
    accent: 'wine',
    projects: [
      {
        title: 'Influencer & Model Sourcing for Fashion Campaigns',
        brand: 'AOAS',
        period: '2025',
        summary:
          'Sourced, vetted, and closed high-intent creators and models for fashion shoots and campaigns — prioritizing engagement quality, audience economics, and execution reliability over raw follower counts.',
        metrics: [
          { value: '20+', label: 'Targeted discovery searches' },
          { value: '4-stage', label: 'Sourcing & diligence funnel' },
        ],
        highlights: [
          'Supported the team to identify, evaluate, and close the right influencers and models for fashion shoots and campaign executions — focused on creator quality, audience economics, and execution reliability.',
          'Defined the brief: above-average engagement, followers with purchasing power and demographic relevance, professional and shoot-ready creators, and clean contract status with no exclusivity conflicts.',
          'Instagram keyword-based discovery: ran 20+ targeted searches across fashion reels, styling, and model content, filtering on engagement-to-follower ratio, comment quality, content aesthetics, on-camera presence, and follower authenticity.',
          'Competitor-led validation: analyzed which creators competitors repeatedly sponsored, treating proven repeat collaborators as high-confidence prospects.',
          'Direct outreach and due diligence: personally confirmed availability, contracts and exclusivity, and professionalism — dropping anyone weak on clarity or execution readiness regardless of follower count.',
          'Final delivery: closed high-quality, brand-aligned creators with contract clarity and shoot readiness, reducing campaign risk and improving creative output quality.',
        ],
      },
    ],
  },
];

export function getDiscipline(slug: string): Discipline | undefined {
  return disciplines.find((discipline) => discipline.slug === slug);
}

// Letters of recommendation / client testimonials.
// Avatars live in public/testimonials/ and are referenced by absolute path.
export const testimonials: Testimonial[] = [
  {
    name: 'Mahesh Kadu',
    title: 'Co-founder & CEO',
    company: 'High Growthers',
    quote:
      'I’ve had a good experience working with Heramb in the social media and SEO space. He’s consistently creative with his work and very quick when it comes to executing content calendars and community building strategies. He has a calm mindset and is easy to work with. We still collaborate together even today.',
    avatar: '/testimonials/mahesh-kadu.png',
  },
  {
    name: 'Bryan Carter',
    title: 'Founder & CEO',
    company: 'Growthucator',
    quote:
      'Heramb has been instrumental in helping me refine my GTM content marketing strategy. His insightful tips and suggestions have significantly contributed to my business growth and have given me great value. I truly value his deep understanding of consumer behavior and the technical expertise required to excel in digital marketing. His precision and strategic approach make him an invaluable resource for anyone looking to elevate their marketing efforts. I’m incredibly grateful for his support.',
    avatar: '/testimonials/bryan-carter.webp',
  },
  {
    name: 'Timothy Cortez',
    title: 'Founder & CEO',
    company: 'Financial Family Values',
    quote:
      'Heramb played a crucial role in helping me develop the Ideal Customer Persona (ICP) for my business. His deep knowledge of market research, marketing, and audience targeting made the process seamless and effective. Thanks to his guidance, I gained clarity on my target audience, which allowed me to tailor my marketing efforts and achieve business growth.',
    avatar: '/testimonials/timothy-cortez.webp',
  },
];

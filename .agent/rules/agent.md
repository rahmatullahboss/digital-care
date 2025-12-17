---
trigger: always_on
---

# Digital Care Solutions - Project Instructions

## Overview
Bengali digital marketing agency website built with Next.js 16, deployed on Cloudflare Workers using OpenNext.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Cloudflare D1 (SQLite)
- **Auth**: NextAuth.js
- **Deployment**: Cloudflare Workers via @opennextjs/cloudflare
- **Font**: Hind Siliguri (Bengali)

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin panel (protected)
│   ├── api/            # API routes
│   ├── blog/           # Blog pages
│   ├── services/       # Services page
│   └── page.tsx        # Homepage
├── components/
│   ├── layout/         # Header, Footer, FloatingButtons
│   ├── sections/       # Page sections (Hero, Services, Pricing, FAQ, etc.)
│   └── ui/             # Reusable UI components
└── lib/
    └── db.ts           # D1 database helper & types
```

## Key Files
- `wrangler.toml` - Cloudflare Workers config (keep in .gitignore)
- `next.config.ts` - Next.js configuration
- `src/lib/db.ts` - D1 database access with `getCloudflareContext({ async: true })`

## Important Patterns

### D1 Database Access
Always use async mode and force-dynamic on pages that access D1:
```tsx
// In page files
export const dynamic = "force-dynamic";

// In lib/db.ts
const { env } = await getCloudflareContext({ async: true });
```

### Type Safety for D1 Results
```tsx
results.map((row: Record<string, unknown>) => ({
  ...row,
  features: JSON.parse(row.features as string)
}))
```

## Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build:worker` | Build for Cloudflare Workers |
| `npm run deploy` | Deploy to Cloudflare |
| `npm run preview` | Preview worker locally |

## Environment Variables
- `NEXTAUTH_SECRET` - Auth secret key
- `NEXTAUTH_URL` - Base URL for auth

## Database Tables
- `services` - Service offerings
- `pricing` - Pricing packages
- `faq` - FAQ items
- `posts` - Blog posts
- `site_settings` - Site configuration
- `contact_submissions` - Contact form data
- `affiliate_applications` - Affiliate requests

##Push after every edit#
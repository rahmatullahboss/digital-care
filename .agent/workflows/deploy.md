---
description: How to deploy the Digital Care website to Cloudflare Workers
---

# Deployment Workflow

## Prerequisites
- Node.js installed
- Wrangler CLI authenticated (`npx wrangler login`)
- D1 database created on Cloudflare

## Build & Deploy

// turbo
1. Build the worker:
```bash
npm run build:worker
```

// turbo
2. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

3. Verify deployment at: https://digital-care.rahmatullahzisan.workers.dev

## Common Issues

### Blank Page After Deployment
- Ensure `wrangler.toml` has `main = ".open-next/worker.js"` and `[assets]` configuration
- All pages accessing D1 must have `export const dynamic = "force-dynamic"`
- Use `getCloudflareContext({ async: true })` in `src/lib/db.ts`

### TypeScript Build Errors
- When mapping D1 query results, use explicit types: `results.map((item: Record<string, unknown>) => ...)`

### getCloudflareContext Error
If you see "getCloudflareContext called in sync mode":
- Add `export const dynamic = "force-dynamic"` to the page
- Ensure `getCloudflareContext({ async: true })` is used

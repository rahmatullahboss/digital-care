# Deployment Guide for Digital Care

This guide explains how to deploy changes to the live site hosted on Cloudflare Workers.

## 🚀 Quick Deploy (Standard Routine)

Whenever you make changes to the code (React components, API routes, translations, etc.), you **MUST** rebuild the application before deploying.

Run these two commands in order:

```bash
# 1. Build the Next.js application for Cloudflare Workers
# (Runs: opennextjs-cloudflare build)
npm run build:worker

# 2. Upload the built worker to Cloudflare
# (Runs: opennextjs-cloudflare deploy)
npm run deploy
```

> **Warning:** If you only run `npm run deploy` without building first, your changes will **NOT** appear on the live site because it will simply re-upload the old build.

---

## 🗄️ Database Changes (D1)

If your changes involve the database (e.g., adding a new table like `career_applications`), you must run the migration **before** deploying.

1. **Create a migration file** (SQL) in `src/lib/migrations/`.
2. **Execute the migration** against the remote database:

```bash
npx wrangler d1 execute digital-care-db --remote --file=src/lib/migrations/YOUR_FILE_NAME.sql
```

_Example:_

```bash
npx wrangler d1 execute digital-care-db --remote --file=src/lib/migrations/0001_careers.sql
```

---

## 🛠️ Development (Local Testing)

To run the project locally and see changes instantly:

```bash
npm run dev
```

To preview how the Cloudflare Worker will behave locally (closer to production):

```bash
npm run build:worker
npm run preview
```

---

## ❌ Common Issues

**"I deployed but I don't see my changes!"**

- Did you run `npm run build:worker`?
- Try clearing your browser cache or opening the site in Incognito mode.
- Cloudflare caching might take a few seconds to purge.

**"Database error on live site"**

- Did you run the migration command?
- Check if your environment variables (in Cloudflare dashboard) match what your code expects.

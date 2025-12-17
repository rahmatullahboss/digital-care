---
description: How to run the Digital Care website locally for development
---

# Local Development Workflow

## Start Development Server

// turbo
1. Install dependencies (if needed):
```bash
npm install
```

// turbo
2. Start the Next.js dev server:
```bash
npm run dev
```

3. Open http://localhost:3000 in browser

## Database (D1)

### Local D1 Development
Wrangler automatically uses local D1 in dev mode. To access remote D1:

```bash
npx wrangler d1 execute digital-care-db --remote --command "SELECT * FROM services"
```

### Run Migrations
```bash
npx wrangler d1 migrations apply digital-care-db --local   # Local
npx wrangler d1 migrations apply digital-care-db --remote  # Production
```

## Admin Panel
- URL: http://localhost:3000/admin
- Login required (NextAuth.js)
- Manage: Services, Pricing, FAQ, Blog Posts, Settings

# Nicaraguan Homes For Rent

Next.js app connected to GitHub and Vercel for automatic deployments.

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Workflow

1. Work locally in this folder.
2. Commit changes.
3. Push to `main` on GitHub.
4. Vercel auto-deploys from GitHub.

## Supabase setup

Add these variables to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
DATABASE_URL=...
ADMIN_ACCESS_PASSWORD=...
ADMIN_SESSION_SECRET=...
```

Run the initial database setup:

```bash
npm run db:verify
npm run db:migrate:initial
npm run db:migrate:expand
```

Admin dashboard:

```text
/admin
```

## Automation listing publish

The Daily Nicaragua media automation can publish a completed listing bundle into the website after YouTube upload:

```bash
npm run automation:publish-listing -- --listing-output C:\path\to\listing-output
```

The command uploads selected regenerated photos from `source\visual-manifest.json` into the public `listing-media` bucket, upserts the matching `listings` row, and attaches the long-form/Shorts YouTube URLs as external `listing_videos` records. It requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the process environment or `.env.local`; it does not print secret values.

## Useful commands

```bash
npm run lint
npm run build
npm run db:verify
npm run db:migrate:initial
npm run db:migrate:expand
git push origin main
```

## Links

- GitHub: https://github.com/avirtualassistant505/nicaraguan-homes-for-rent
- Vercel Production: https://nicaraguan-homes-for-rent.vercel.app

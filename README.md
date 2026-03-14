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

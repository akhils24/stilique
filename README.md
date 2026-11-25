# Stilique

Portfolio website for Stilique, an architecture and interior design studio in Bolzano and Berlin.

Built with Next.js 16 (App Router, Cache Components) and Tailwind CSS 4. Content will be managed in Sanity; for the design preview it comes from local seed data.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Structure

| Path | What it is |
|---|---|
| `src/app/` | Routes: `/`, `/work`, `/work/[category]`, `/work/[category]/[project]`, `/studio`, `/contact`, legal pages |
| `src/components/` | UI components (header, footer, project card, gallery + lightbox, contact form, scroll reveals) |
| `src/lib/content/` | **The only data access layer.** `types.ts` mirrors the planned Sanity schema; `index.ts` exposes `getProjects()`, `getCategory()`, etc. |
| `src/content/seed.ts` | Seed content from the client's portfolio PDF (becomes the Sanity import later) |
| `src/content/media.ts` | Generated image manifest (dimensions + blur placeholders) for `public/images/projects/` |

Pages never import seed data directly, so connecting Sanity only means rewriting `src/lib/content/index.ts`.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for metadata, sitemap and robots |
| `RESEND_API_KEY` | Enables contact form email delivery. Without it the form works in preview mode and logs enquiries |
| `CONTACT_TO_EMAIL` | Inbox for enquiries (default `info@stilique.it`) |
| `CONTACT_FROM_EMAIL` | Sender address, must be on a domain verified in Resend |

## Before launch

- Replace PDF-extracted photos with the client's originals (via Sanity)
- Impressum and privacy policy text from the client
- Review alt text and category intros

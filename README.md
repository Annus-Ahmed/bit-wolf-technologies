# BIT-WOLF Technologies

Responsive corporate website built with Next.js App Router, React, TypeScript, Tailwind CSS, and Lucide icons. Includes all company pages, five service pages, a configurable portfolio, a validated contact endpoint, WhatsApp links, metadata, sitemap, robots, and a custom 404.

## Local development

Requires Node.js 20.9+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On Windows PowerShell use `Copy-Item .env.example .env.local`.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

With the development server running, `node scripts/verify-local.mjs` checks internal routes, custom 404, sitemap, robots, invalid enquiry requests, and rate limiting without sending email. This script requires Node.js 22.18+ for native TypeScript support.

## Email and spam protection

Set these environment variables on the deployment platform:

- `NEXT_PUBLIC_SITE_URL`: actual HTTPS origin, no trailing slash. Used for metadata, sitemap, and contact origin checks.
- `CONTACT_EMAIL`: inbox receiving enquiries.
- `RESEND_API_KEY`: server-only Resend API key.
- `EMAIL_FROM`: sender address on a domain verified with Resend. Do not use an unverified example domain.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST credentials for persistent, atomic rate limiting (five valid enquiries per network identifier per ten minutes). These are **required for production enquiries**. Development uses an in-memory fallback.

The contact form validates on both client and server, requires consent, checks request origin and body size, includes a honeypot, and uses Resend idempotency keys to avoid duplicate delivery on retries. Enquiries are sent as plain text with the visitor address as Reply-To. Secrets stay on the server. Provider acceptance is required before success is shown; this does not guarantee inbox delivery. Missing configuration returns a helpful unavailable state and directs visitors to WhatsApp or phone. Production fails closed if the shared limiter is unavailable. Configure only trusted proxy headers if deploying outside Vercel; an edge rate-limit or bot challenge can supplement this protection.

Test delivery with your verified sender and real inbox before launch. No credentials were supplied, so real email delivery cannot be verified in this checkout.

## Vercel deployment

Import this repository in Vercel, select the Next.js preset, and leave build/output settings at their defaults. Set the variables above for the appropriate environments, then deploy. Set `NEXT_PUBLIC_SITE_URL` to the actual preview origin when testing a preview, or use the production origin for the production environment. Check the contact form, provider delivery log, sitemap, and custom domain after deployment. No separate Vite, Cloudflare, database, or authentication setup is needed.

## Content to supply before public launch

- Official company email, verified sending domain, deployment URL, and email/rate-limit credentials.
- Approved privacy and terms text, privacy contact, and retention policy. Both legal pages are explicitly marked drafts.
- Real project screenshots, descriptions, technologies, and permission to publish. Portfolio currently shows an honest empty state and working category selection; it contains no fabricated client work.
- Optional founder photographs, biographies, role designations, and verified LinkedIn/social URLs. Both founders are presented equally as Co-Founder; unsupported biographies and profiles are omitted.
- Confirm technologies and capabilities the team can deliver. No cloud vendor certification or partnership is claimed.

## Assets and structure

`public/images/bit-wolf-original.png` is the exact supplied logo. The wolf symbol, wordmark, and favicon are crops of this image with unchanged artwork. The source remains untouched. Compact derivatives remove only the dark background to sit cleanly on the site. No replacement logo or AI artwork is used. The hero devices are responsive HTML/CSS illustrations with readable interface content, not client project claims.

- `src/data/site.ts`: company contacts, services, industry descriptions, and process.
- `src/components`: shared navigation, footer, sections, device artwork, forms, and portfolio.
- `src/app`: pages, metadata, and server-side enquiry endpoint.
- `src/lib`: shared validation and rate limiting.

Keep real environment files out of source control. The repository is connected to Vercel. Pushes to main trigger automatic deployments. Production URL: https://bit-wolf-technologies-anaxs-projects.vercel.app. Configure the contact provider variables before relying on email enquiries.

# Sovereignty Cybersecurity

A professional marketing site for cybersecurity services aimed at family businesses, closely held companies, and high-net-worth households.

**Company:** Sovereignty Cybersecurity  
**Tagline:** When business is personal, you need a cybersecurity professional you can trust.

Live site: [https://sovereigntycyber.com](https://sovereigntycyber.com)

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and shadcn/ui
- Server Action contact form (`info@sovereigntycyber.com`)
- Leave-behind **Cybersecurity Overview** page at [`/overview`](https://sovereigntycyber.com/overview) (QR / business card URL; not in the main nav)
- Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)

## Repository

GitHub (private): [iamarnett001/Hacked0FFCybersecurity_Website](https://github.com/iamarnett001/Hacked0FFCybersecurity_Website)

```bash
gh repo clone iamarnett001/Hacked0FFCybersecurity_Website
cd Hacked0FFCybersecurity_Website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run lint
npm run build
```

## Deploy to Cloudflare

Cloudflare currently runs `npm run build` then `npx wrangler deploy`. Those are two different tools:

1. **`next build`** (`npm run build`) compiles the Next.js app. That is the “Compiled successfully” line in the log.
2. **`opennextjs-cloudflare build`** (`npm run cf:build`) compiles `open-next.config.ts` into `.open-next/` so Wrangler can deploy a Worker.

If step 1 is only `next build`, Wrangler then fails with “Could not find compiled Open Next config.”

In the Worker project: **Settings → Build**, set:

- **Build command:** `npx opennextjs-cloudflare build`  
  (not `npm run build` — OpenNext itself calls `npm run build` to run Next.js)
- **Deploy command:** `npx wrangler deploy`

Manual deploy:

```bash
npx wrangler login
npm run deploy
```

The Worker name in `wrangler.jsonc` is `sovereigntycyber-website`. Attach `sovereigntycyber.com` to that Worker if it is not already.

### Secrets

Both forms email **`info@sovereigntycyber.com`**. They will not send until Resend is configured:

1. Create a Resend account and verify `sovereigntycyber.com`.
2. In Cloudflare → Worker `sovereigntycyber-website` → Settings → Variables and Secrets, add a **secret** named `RESEND_API_KEY`.
3. Optionally add `CONTACT_FROM_EMAIL` as `Sovereignty Cybersecurity <noreply@sovereigntycyber.com>`. If omitted, that from-address is used automatically. The from domain must be verified in Resend.

Copy `.env.example` to `.env.local` for local email testing. After adding the secret, redeploy the Worker.

## Security controls

- `poweredByHeader` is off (no `X-Powered-By: Next.js`)
- HSTS, CSP, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy
- Contact fields are length-capped and stripped of CR/LF to block SMTP header injection
- Names, company, and notes reject HTML/code markers and common prompt-injection phrasing
- Honeypot field plus per-IP rate limit (5 inquiries / 15 minutes)
- Inquiry logs do not include names or email addresses
- GitHub Actions runs `npm test`, `lint`, and `build` on every push

Also turn on in the Cloudflare dashboard for `sovereigntycyber.com`: SSL/TLS Full (strict), Always Use HTTPS, Bot Fight Mode, and a WAF rate-limit on POST to `/` and `/overview`.

## Cybersecurity Overview page

URL for QR codes, business cards, and one-pagers: [https://sovereigntycyber.com/overview](https://sovereigntycyber.com/overview)

Keep this path stable for printed QR codes. The page is omitted from the primary navigation on purpose. The homepage links to it from the contact section and the footer. Search engines are asked not to index it (`noindex`). The form emails `info@sovereigntycyber.com` with company name, first name, last name, email, phone, and an approximate employee count. Pricing starts at $149 for a single site with less than 10 employees.

## Company identity

Public name, email, and domain live in `src/lib/site.ts` (`legalName`, `shortName`, `domain`, `email`).

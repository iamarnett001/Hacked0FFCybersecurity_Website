# Cybersecurity for family businesses

A professional marketing site for cybersecurity services aimed at family businesses, closely held companies, and high-net-worth households. The legal name is kept quiet on purpose so it can change later; the site leads with the promise, not the brand.

**Tagline:** When business is personal, you need a cybersecurity professional you can trust.

Live site: [https://hacked0ff.com](https://hacked0ff.com)

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and shadcn/ui
- Server Action contact form (`info@hacked0ff.com`)
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

The Worker name in `wrangler.jsonc` is `hacked0ffcybersecurity-website`. Attach `hacked0ff.com` to that Worker if it is not already.

### Secrets

Set these in Cloudflare → Worker → Settings → Variables and Secrets (not in git):

```
RESEND_API_KEY
CONTACT_FROM_EMAIL=Website <noreply@hacked0ff.com>
CONTACT_TO_EMAIL=info@hacked0ff.com
```

Copy `.env.example` to `.env.local` for local email testing.

## Security controls

- `poweredByHeader` is off (no `X-Powered-By: Next.js`)
- HSTS, CSP, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy
- Contact fields are length-capped and stripped of CR/LF to block SMTP header injection
- Honeypot field plus per-IP rate limit (5 inquiries / 15 minutes)
- Inquiry logs do not include names or email addresses
- GitHub Actions runs `npm test`, `lint`, and `build` on every push

Also turn on in the Cloudflare dashboard for `hacked0ff.com`: SSL/TLS Full (strict), Always Use HTTPS, Bot Fight Mode, and a WAF rate-limit on POST to `/`.

## Changing the company name

The quiet legal name lives in `src/lib/site.ts` (`legalName` and `shortName`).

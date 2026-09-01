# Cybersecurity for family businesses

A professional marketing site for cybersecurity services aimed at family businesses, closely held companies, and high-net-worth households. The legal name is kept quiet on purpose so it can change later; the site leads with the promise, not the brand.

**Tagline:** When business is personal, you need a cybersecurity professional you can trust.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and shadcn/ui
- Server Action contact form (`info@hacked0ff.com`)

This is a static-feeling marketing site with one server action for inquiries. Deploy it on Vercel from the repository.

## Repository

The code lives in a **private** repository: [charles-arnett/Hacked0FFCybersecurity_Website](https://cursor.com/codebase/charles-arnett/Hacked0FFCybersecurity_Website). Visibility can be changed in settings on that page.

### Clone on Windows (WSL)

Origin CLI runs on macOS, Linux, and WSL — not in PowerShell. In a WSL terminal:

```bash
# Run in WSL (Origin CLI is not available in PowerShell)
# Install the Origin CLI
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh

# Sign in (also sets up git credentials)
origin auth login

# Clone the repository
origin repo clone charles-arnett/Hacked0FFCybersecurity_Website
```

If `origin` is not found after install, persist `~/.local/bin` on PATH:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Origin CLI docs: [https://cursor.com/docs/origin/cli](https://cursor.com/docs/origin/cli)

Do not commit `.env.local` or API keys. `.gitignore` already excludes `.env*`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Publish the website

The site is built for [Vercel](https://vercel.com). Connect this repository, leave the defaults (Next.js is detected automatically), and each push to `main` deploys.

## Contact form email

The “Request more information” form validates on the server and, when email is configured, delivers the inquiry to `info@hacked0ff.com`.

Without secrets, submissions still succeed in the UI so you can preview the site. They are logged on the server but **not emailed**. To send real mail:

1. Create a free [Resend](https://resend.com) account.
2. Verify `hacked0ff.com` (or use Resend’s onboarding domain for tests).
3. Copy `.env.example` to `.env.local` and fill in:

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_FROM_EMAIL="Website <noreply@hacked0ff.com>"
CONTACT_TO_EMAIL=info@hacked0ff.com
```

4. In Vercel, add the same values under Project → Settings → Environment Variables.

Until that is set, people can still write to [info@hacked0ff.com](mailto:info@hacked0ff.com) from the page.

## Changing the company name

The quiet legal name lives in `src/lib/site.ts` (`legalName` and `shortName`). Swap it there when you are ready; the rest of the site is written so the brand is not the headline.

## Project layout

```
src/app/          # Next.js routes, layout, contact action
src/components/   # Page sections and shadcn/ui primitives
src/lib/site.ts   # Copy, services, statistics, contact details
src/lib/contact.ts
```

Industry statistics on the site are attributed to public reports (IBM, Fortra, Veeam, CrowdStrike, TechValidate). They are used as cited facts, not as copied marketing copy from any vendor eBook.

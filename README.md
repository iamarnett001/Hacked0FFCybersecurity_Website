# Cybersecurity for family businesses

A professional marketing site for cybersecurity services aimed at family businesses, closely held companies, and high-net-worth households. The legal name is kept quiet on purpose so it can change later; the site leads with the promise, not the brand.

**Tagline:** When business is personal, you need a cybersecurity professional you can trust.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and shadcn/ui
- Server Action contact form (`info@hacked0ff.com`)

This is a static-feeling marketing site with one server action for inquiries. Deploy it on Vercel from GitHub.

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

## How to put this on GitHub

This project is already a git repository. To host the code on GitHub:

1. Create a new **empty** GitHub repository (no README, license, or `.gitignore` — this repo already has those).
2. Copy the remote URL GitHub shows you.
3. Point this project at that remote and push:

```bash
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
# If origin already exists (it may, from this workspace):
# git remote set-url origin git@github.com:YOUR_USER/YOUR_REPO.git

git push -u origin main
```

If you prefer HTTPS:

```bash
git remote set-url origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

After the first push, every commit can go up with `git add`, `git commit`, and `git push`.

### Suggested GitHub settings

- Keep the repository **private** until you are ready to publish the site.
- Add a collaborator if someone else will edit copy.
- Do not commit `.env.local` or API keys. `.gitignore` already excludes `.env*`.

## Publish the website

The site is built for [Vercel](https://vercel.com). Connect the GitHub repository, leave the defaults (Next.js is detected automatically), and each push to `main` deploys.

If you use the Publish control in Cursor, it will wire the same GitHub-to-Vercel flow.

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

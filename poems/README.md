# Persian poetry → Dutch (QR)

A standalone site, separate from the SABZE site in the repository root.
Each Persian verse gets a page at `/p/<slug>` with the Dutch translation, pronunciation,
explanation, and key terms. The QR code printed next to the verse points to that page.

## Deploying to Vercel (as a separate project)
1. Vercel → Add New → Project → choose this repository.
2. **Root Directory: `poems`** (important).
3. Set the environment variables from `.env.example`. At minimum: `NEXT_PUBLIC_SITE_URL`,
   `STUDIO_PASSWORD`, `ANTHROPIC_API_KEY`.
4. Under Settings → Domains, connect your own domain and set `NEXT_PUBLIC_SITE_URL` to it.
   Set the domain **before** printing QR codes; they contain the full address.

The main SABZE project should not redeploy on changes to `poems/`. In that project's
Settings → Git → Ignored Build Step, you can use: `git diff --quiet HEAD^ HEAD -- . ':!poems'`

## Usage (studio)
1. Go to `/studio` (not linked in the menu, and not indexed by search engines).
2. Enter the password, then the Persian verse (one hemistich per line) and optionally the poet.
3. "Create draft" → Claude writes a Dutch translation + explanation. **Review and edit it.**
4. "Approve and publish" → `poems/data/poems.json` is updated on GitHub and Vercel redeploys (~1–2 min).
5. Download the QR as PNG/SVG, or the print-ready "card" (10×15 cm, verse + QR).

Without `GITHUB_TOKEN`, the studio shows the poem as JSON; add it manually to `poems/data/poems.json`.

## Local
```bash
cd poems
npm install
cp .env.example .env.local   # fill in
npm run dev
```

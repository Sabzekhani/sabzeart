# Poems & QR codes / شعر و QR کد

Each Persian verse gets a page at `/nl/poem/<slug>` with the Dutch translation,
pronunciation, and explanation. The QR code printed next to the verse points to that page.

## Usage (studio)
1. Go to `/nl/studio` (not linked in the menu, and not indexed).
2. Enter the password, then the Persian verse (one hemistich per line) and optionally the poet.
3. "Create draft" → Claude writes a Dutch translation + explanation. **Review and edit it.**
4. "Approve and publish" → `data/poems.json` is updated on GitHub and Vercel redeploys (~1–2 min).
5. Download the QR as PNG/SVG, or the print-ready "card" (10×15 cm, verse + QR).

Without `GITHUB_TOKEN`, the studio shows the poem as JSON; add it manually to `data/poems.json`.

## Environment variables (Vercel → Settings → Environment Variables)
See `.env.example`: `STUDIO_PASSWORD`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SITE_URL`,
and optionally `GITHUB_TOKEN` (fine-grained, Contents read/write on this repo only),
`GITHUB_REPO`, `GITHUB_BRANCH`.

The QR encodes only a short URL, so it stays small and scannable, and translations can be
corrected later without reprinting.

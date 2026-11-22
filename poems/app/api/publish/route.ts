import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isStudioAuthorized } from '@/lib/studio-auth'
import type { Poem } from '@/lib/types'

const poemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug: alleen kleine letters, cijfers en streepjes').max(80),
  persian: z.string().min(1),
  poet: z.string().min(1),
  source: z.string().optional(),
  createdAt: z.string(),
  nl: z.object({
    transliteration: z.string(),
    translation: z.string().min(1),
    explanation: z.string().min(1),
    keyTerms: z.array(z.object({ term: z.string(), meaning: z.string() })),
  }),
})

const requestSchema = z.object({ password: z.string(), poem: poemSchema })

// Path of the poems file inside the GitHub repository
const FILE_PATH = process.env.GITHUB_FILE_PATH ?? 'poems/data/poems.json'

/** Adds or replaces a poem in data/poems.json on GitHub. Vercel redeploys on the commit. */
export async function POST(req: NextRequest) {
  const parsed = requestSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Ongeldige invoer' }, { status: 400 })
  }
  if (!isStudioAuthorized(parsed.data.password)) {
    return NextResponse.json({ error: 'Onjuist wachtwoord' }, { status: 401 })
  }

  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? 'main'
  if (!token || !repo) {
    return NextResponse.json({ error: 'not_configured' }, { status: 501 })
  }

  const poem = parsed.data.poem as Poem
  const api = `https://api.github.com/repos/${repo}/contents/${FILE_PATH}`
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  const current = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers, cache: 'no-store' })
  if (!current.ok) {
    return NextResponse.json({ error: `GitHub: kon ${FILE_PATH} niet lezen (${current.status})` }, { status: 502 })
  }
  const file = (await current.json()) as { sha: string; content: string }
  const list = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')) as Poem[]

  const index = list.findIndex((p) => p.slug === poem.slug)
  if (index >= 0) list[index] = poem
  else list.push(poem)

  const body = JSON.stringify(list, null, 2) + '\n'
  const update = await fetch(api, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `${index >= 0 ? 'Update' : 'Add'} poem: ${poem.slug}`,
      content: Buffer.from(body, 'utf8').toString('base64'),
      sha: file.sha,
      branch,
    }),
  })
  if (!update.ok) {
    return NextResponse.json({ error: `GitHub: opslaan mislukt (${update.status})` }, { status: 502 })
  }
  return NextResponse.json({ ok: true, updated: index >= 0 })
}

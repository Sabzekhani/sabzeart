import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod'
import { z } from 'zod'
import { isStudioAuthorized } from '@/lib/studio-auth'

export const maxDuration = 300

const requestSchema = z.object({
  password: z.string(),
  persian: z.string().min(1).max(4000),
  poet: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
})

const draftSchema = z.object({
  slug: z.string().describe('Short lowercase ASCII slug, e.g. "hafez-dar-azal" (poet + first Latin words).'),
  poet: z.string().describe('Poet name in Dutch/Latin spelling, or "Onbekend" if not identifiable.'),
  source: z.string().describe('Work the lines come from (e.g. "Divan", "Masnavi"), or an empty string if unsure.'),
  transliteration: z.string().describe('Latin transliteration of the Persian, same line breaks.'),
  translation: z.string().describe('Dutch translation, same line breaks as the original.'),
  explanation: z.string().describe('Dutch explanation for a general audience, 2-3 short paragraphs separated by a blank line.'),
  keyTerms: z
    .array(z.object({ term: z.string(), meaning: z.string() }))
    .describe('2-4 key Persian words: term as "persian (transliteration)", meaning in Dutch.'),
})

const SYSTEM_PROMPT = `You are a literary translator of classical and modern Persian poetry into Dutch, writing for visitors of an art exhibition in The Hague.

For the Persian text you receive:
- Translate it into natural, poetic but faithful Dutch. Keep the line structure (one Dutch line per Persian line/hemistich pair as given). Do not add rhyme at the cost of meaning.
- Write an explanation in Dutch for someone with no knowledge of Persian culture: what the lines say, the imagery and symbols (e.g. wine, the beloved, the candle and the moth) and, where relevant, the mystical/Sufi reading. Be concrete and warm, not academic. 120-220 words.
- Identify the poet and work only if you are confident; never invent a source. If the user names a poet, trust it.
- Pick 2-4 key terms that a Dutch reader would benefit from knowing.
All output text except the Persian terms must be in Dutch.`

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const parsed = requestSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Ongeldige invoer' }, { status: 400 })
  const { password, persian, poet, notes } = parsed.data
  if (!isStudioAuthorized(password)) return NextResponse.json({ error: 'Onjuist wachtwoord' }, { status: 401 })
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is niet ingesteld op de server' }, { status: 500 })
  }

  const userText = [
    `<persian_text>\n${persian}\n</persian_text>`,
    poet ? `<poet>${poet}</poet>` : '',
    notes ? `<notes_from_artist>\n${notes}\n</notes_from_artist>` : '',
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const response = await client.beta.messages.parse({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'high', format: betaZodOutputFormat(draftSchema) },
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userText }],
    })

    if (response.stop_reason === 'refusal') {
      return NextResponse.json({ error: 'Het model weigerde deze tekst te vertalen.' }, { status: 422 })
    }
    const draft = response.parsed_output
    if (!draft) return NextResponse.json({ error: 'Geen bruikbaar antwoord ontvangen, probeer opnieuw.' }, { status: 502 })

    draft.slug = draft.slug
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60)
    return NextResponse.json({ draft })
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: 'Ongeldige ANTHROPIC_API_KEY' }, { status: 500 })
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'Te veel verzoeken, probeer het zo opnieuw.' }, { status: 429 })
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `API-fout ${error.status}: ${error.message}` }, { status: 502 })
    }
    throw error
  }
}

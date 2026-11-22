export interface PoemKeyTerm {
  term: string
  meaning: string
}

export interface PoemTranslation {
  transliteration: string
  translation: string
  explanation: string
  keyTerms: PoemKeyTerm[]
}

export interface Poem {
  slug: string
  persian: string
  poet: string
  source?: string
  createdAt: string
  nl: PoemTranslation
}

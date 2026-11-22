export type Locale = 'en' | 'nl' | 'es'

export interface Artwork {
  id: string
  slug: string
  title: string
  year: number
  medium: string
  dimensions: string
  series?: string
  available: boolean
  price?: string
  description: string
  imageUrl: string
  width: number
  height: number
}

export interface Exhibition {
  id: string
  title: string
  venue: string
  city: string
  country: string
  year: number
  type: 'solo' | 'group' | 'fair'
}

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

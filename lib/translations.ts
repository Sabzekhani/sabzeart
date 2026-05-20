import en from '../messages/en.json'
import nl from '../messages/nl.json'
import es from '../messages/es.json'

const messages: Record<string, Record<string, unknown>> = { en, nl, es }

function getNestedValue(obj: Record<string, unknown>, key: string): string {
  const keys = key.split('.')
  let current: unknown = obj
  for (const k of keys) {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  return typeof current === 'string' ? current : key
}

export function getTranslations(locale: string, namespace: string) {
  const msgs = messages[locale] ?? messages['en']
  const ns = (msgs as Record<string, unknown>)[namespace] as Record<string, unknown> ?? {}
  return (key: string) => {
    const val = ns[key]
    return typeof val === 'string' ? val : key
  }
}

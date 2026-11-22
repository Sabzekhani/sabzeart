import { timingSafeEqual } from 'crypto'

/** Constant-time check of the studio password sent by the /studio page. */
export function isStudioAuthorized(password: unknown): boolean {
  const expected = process.env.STUDIO_PASSWORD
  if (!expected || typeof password !== 'string') return false
  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

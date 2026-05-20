import type { Exhibition } from '@/types'

interface ExhibitionTimelineProps {
  exhibitions: Exhibition[]
  soloLabel: string
  groupLabel: string
  fairLabel: string
}

const typeStyle: Record<string, React.CSSProperties> = {
  solo:  { color: 'var(--color-sabze-gold)',  borderColor: 'rgba(201,168,76,0.4)' },
  group: { color: 'var(--color-sabze-sage)',  borderColor: 'rgba(90,122,92,0.4)'  },
  fair:  { color: 'var(--color-sabze-rust)',  borderColor: 'rgba(155,91,58,0.4)'  },
}

export default function ExhibitionTimeline({
  exhibitions,
  soloLabel,
  groupLabel,
  fairLabel,
}: ExhibitionTimelineProps) {
  const labels: Record<string, string> = { solo: soloLabel, group: groupLabel, fair: fairLabel }

  // Group by year
  const byYear = exhibitions.reduce<Record<number, Exhibition[]>>((acc, ex) => {
    if (!acc[ex.year]) acc[ex.year] = []
    acc[ex.year].push(ex)
    return acc
  }, {})

  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {years.map((year) => (
        <div key={year}>
          {byYear[year].map((ex, i) => (
            <div
              key={ex.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr auto',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1.25rem 0',
                borderBottom: '1px solid rgba(196,184,173,0.18)',
              }}
            >
              {/* Year — only show for first in year group */}
              <span style={{
                fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 300,
                color: i === 0 ? 'rgba(140,126,114,0.45)' : 'transparent',
                lineHeight: 1, userSelect: 'none',
              }}>
                {year}
              </span>

              {/* Title + venue */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 300,
                  color: 'var(--color-sabze-ink)', lineHeight: 1.3,
                  transition: 'color 0.3s',
                }}>
                  {ex.title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 300,
                  letterSpacing: '0.15em', color: 'var(--color-sabze-stone)', marginTop: '0.25rem',
                }}>
                  {ex.venue} · {ex.city}, {ex.country}
                </p>
              </div>

              {/* Type badge */}
              <span style={{
                fontFamily: 'var(--font-jost)', fontSize: '0.5rem', fontWeight: 300,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                border: '1px solid', padding: '0.2rem 0.65rem',
                ...typeStyle[ex.type],
              }}>
                {labels[ex.type]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

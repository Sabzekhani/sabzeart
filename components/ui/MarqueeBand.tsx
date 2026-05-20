interface MarqueeBandProps {
  items: string[]
}

export default function MarqueeBand({ items }: MarqueeBandProps) {
  const doubled = [...items, ...items]

  return (
    <div className="bg-sabze-ink border-y border-sabze-gold/15 overflow-hidden py-3.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 font-cormorant text-sm font-light italic text-sabze-gold/50"
          >
            {item}
            <span className="text-sabze-gold/25 text-[0.45rem] not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

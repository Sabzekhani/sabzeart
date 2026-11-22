import QRCode from 'qrcode'

const QR_OPTIONS = { errorCorrectionLevel: 'M' as const, margin: 2, color: { dark: '#1A1612', light: '#FFFFFF' } }

export function qrSvg(url: string) {
  return QRCode.toString(url, { ...QR_OPTIONS, type: 'svg' })
}

export function qrDataUrl(url: string, width = 1024) {
  return QRCode.toDataURL(url, { ...QR_OPTIONS, width })
}

export function downloadBlob(blob: Blob, filename: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Print-ready card (PNG, ~300 dpi at 10 × 15 cm): Persian verse on top,
 * poet below, QR code with a short Dutch call to action at the bottom.
 */
export async function renderCard(opts: { url: string; persian: string; poet: string }) {
  const W = 1181
  const H = 1772
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  await document.fonts.load('300 60px Vazirmatn')
  await document.fonts.load('italic 400 40px "Cormorant Garamond"')

  ctx.fillStyle = '#FAF7F2'
  ctx.fillRect(0, 0, W, H)

  // Verse — wrap each line to the card width
  ctx.fillStyle = '#1A1612'
  ctx.textAlign = 'center'
  ctx.direction = 'rtl'
  const maxWidth = W - 200
  const lines: string[] = []
  let fontSize = 62
  const wrap = () => {
    lines.length = 0
    ctx.font = `300 ${fontSize}px Vazirmatn, Tahoma, sans-serif`
    for (const raw of opts.persian.split('\n')) {
      const words = raw.trim().split(/\s+/)
      let line = ''
      for (const w of words) {
        const test = line ? `${line} ${w}` : w
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line)
          line = w
        } else line = test
      }
      if (line) lines.push(line)
    }
  }
  wrap()
  while (lines.length * fontSize * 1.9 > 760 && fontSize > 30) {
    fontSize -= 4
    wrap()
  }
  // Verse + poet + rule form one block, centred in the area above the QR code
  const lineH = fontSize * 1.9
  const blockH = lines.length * lineH + 150
  let y = 100 + (1040 - blockH) / 2 + fontSize
  for (const l of lines) {
    ctx.fillText(l, W / 2, y)
    y += lineH
  }

  ctx.direction = 'ltr'
  ctx.font = 'italic 400 42px "Cormorant Garamond", Georgia, serif'
  ctx.fillStyle = '#8C7E72'
  ctx.fillText(opts.poet, W / 2, y + 30)

  ctx.fillStyle = '#C9A84C'
  ctx.fillRect(W / 2 - 50, y + 95, 100, 2)

  const qr = await loadImage(await qrDataUrl(opts.url, 460))
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(W / 2 - 240, 1190, 480, 480)
  ctx.drawImage(qr, W / 2 - 230, 1200, 460, 460)

  ctx.font = '300 30px Jost, system-ui, sans-serif'
  ctx.fillStyle = '#5A7A5C'
  ctx.fillText('SCAN VOOR VERTALING & TOELICHTING', W / 2, 1725)

  return new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'))
}

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name:         z.string().min(1),
  email:        z.string().email(),
  institution:  z.string().optional(),
  workInterest: z.string().optional(),
  message:      z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.STUDIO_EMAIL ?? 'somaye.khani@ymail.com'

    if (!RESEND_API_KEY) {
      // In development without a key: just log and succeed
      console.log('📧 Inquiry (no Resend key set):', data)
      return NextResponse.json({ success: true })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'SABZE Inquiry <noreply@sabze.nl>',
        to:      [TO_EMAIL],
        replyTo: data.email,
        subject: `New inquiry from ${data.name}${data.workInterest ? ` — ${data.workInterest}` : ''}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1612;">
            <div style="background:#1A1612;padding:24px 32px;margin-bottom:32px;">
              <span style="font-size:22px;letter-spacing:0.2em;">
                <span style="color:#5A7A5C">S</span><span style="color:#C9A84C">ABZ</span><span style="color:#FAF7F2">E</span>
              </span>
              <p style="color:rgba(250,247,242,0.5);font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:4px 0 0;">New Studio Inquiry</p>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr><td style="padding:10px 0;color:#8C7E72;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;width:130px;">Name</td><td style="padding:10px 0;">${data.name}</td></tr>
              <tr><td style="padding:10px 0;color:#8C7E72;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">Email</td><td style="padding:10px 0;"><a href="mailto:${data.email}" style="color:#C9A84C;">${data.email}</a></td></tr>
              ${data.institution ? `<tr><td style="padding:10px 0;color:#8C7E72;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">Institution</td><td style="padding:10px 0;">${data.institution}</td></tr>` : ''}
              ${data.workInterest ? `<tr><td style="padding:10px 0;color:#8C7E72;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">Work interest</td><td style="padding:10px 0;">${data.workInterest}</td></tr>` : ''}
            </table>
            <div style="border-top:1px solid #F0EAE0;margin:24px 0;padding-top:24px;">
              <p style="color:#8C7E72;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 12px;">Message</p>
              <p style="line-height:1.8;white-space:pre-wrap;">${data.message}</p>
            </div>
            <div style="border-top:1px solid #F0EAE0;padding-top:16px;margin-top:32px;">
              <p style="font-size:11px;color:#C4B8AD;letter-spacing:0.1em;">SABZE · The Hague · sabze.nl</p>
            </div>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

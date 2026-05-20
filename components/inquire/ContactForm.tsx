'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface ContactFormProps {
  labels: {
    name: string
    email: string
    institution: string
    workInterest: string
    message: string
    send: string
    sending: string
    successTitle: string
    successBody: string
    errors: { nameRequired: string; emailInvalid: string; messageRequired: string }
  }
  locale: string
}

function buildSchema(errors: ContactFormProps['labels']['errors']) {
  return z.object({
    name:         z.string().min(1, errors.nameRequired),
    email:        z.string().email(errors.emailInvalid),
    institution:  z.string().optional(),
    workInterest: z.string().optional(),
    message:      z.string().min(10, errors.messageRequired),
  })
}

type FormData = {
  name: string
  email: string
  institution?: string
  workInterest?: string
  message: string
}

export default function ContactForm({ labels }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const schema = buildSchema(labels.errors)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/inquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Submission failed')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '3rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-sabze-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8F0E6', fontSize: '1.1rem', flexShrink: 0 }}>✓</span>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.75rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-sabze-gold)' }}>
            {labels.successTitle}
          </p>
        </div>
        <p className="body-serif" style={{ fontSize: '1rem', maxWidth: '28rem' }}>
          {labels.successBody}
        </p>
      </div>
    )
  }

  const fields: Array<{ id: keyof FormData; label: string; type?: string; required?: boolean }> = [
    { id: 'name',         label: labels.name,         type: 'text',  required: true  },
    { id: 'email',        label: labels.email,         type: 'email', required: true  },
    { id: 'institution',  label: labels.institution,   type: 'text'                   },
    { id: 'workInterest', label: labels.workInterest,  type: 'text'                   },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {fields.map(({ id, label, type }) => (
        <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <input
            {...register(id)}
            type={type}
            placeholder={label}
            className="form-input"
            aria-label={label}
            aria-invalid={!!errors[id]}
          />
          {errors[id] && (
            <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.05em', color: '#E24B4A', marginTop: '0.2rem' }}>
              {errors[id]?.message}
            </p>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <textarea
          {...register('message')}
          placeholder={labels.message}
          rows={5}
          className="form-input"
          style={{ resize: 'none' }}
          aria-label={labels.message}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', color: '#E24B4A', marginTop: '0.2rem' }}>
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary"
        style={{ alignSelf: 'flex-start', marginTop: '0.5rem', opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
      >
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 12, height: 12, border: '1.5px solid rgba(250,247,242,0.4)', borderTopColor: '#FAF7F2', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
            {labels.sending}
          </span>
        ) : (
          `${labels.send} →`
        )}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  )
}

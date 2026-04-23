'use client'

import { useState, type FormEvent } from 'react'
import type { Metadata } from 'next'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>We&apos;d Love to Hear From You</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            Contact Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.7 }}>
            Have a question about the scholarship, the event, or sponsorship? Send us a message and we'll get back to you.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', border: '1.5px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--forest)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.5rem', color: 'white' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.8rem', color: 'var(--forest)', marginBottom: '0.75rem' }}>Message Sent</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Thank you for reaching out. We'll be in touch as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: '4px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.6rem', color: 'var(--forest)', marginBottom: '0.25rem' }}>Send a Message</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Contact information will be listed here soon. For now, use the form below.</p>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="ct-name">Your Name <span className="req">✦</span></label>
                  <input type="text" id="ct-name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Doe" required />
                </div>
                <div className="field">
                  <label htmlFor="ct-email">Email <span className="req">✦</span></label>
                  <input type="email" id="ct-email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@email.com" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="ct-subject">Subject <span className="req">✦</span></label>
                <input type="text" id="ct-subject" value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="Question about the scholarship" required />
              </div>
              <div className="field">
                <label htmlFor="ct-message">Message <span className="req">✦</span></label>
                <textarea id="ct-message" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Your message here..." style={{ minHeight: '140px' }} required />
              </div>
              {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{error}</p>}
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-end', paddingRight: '2rem' }}>
                {loading ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

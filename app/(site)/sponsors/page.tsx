'use client'

import { useState, useRef } from 'react'
import type { FormEvent } from 'react'

const TIERS = [
  {
    name: 'Bronze',
    amount: '$500',
    color: '#a0785a',
    badgeColor: '#b87333',
    perks: [
      'Name listed on event website',
      'Social media shoutout (1 post + 5 stories)',
      'Recognition during event announcements',
      '1 VIP access pass',
    ],
  },
  {
    name: 'Silver',
    amount: '$1,000',
    color: '#7a9cb8',
    badgeColor: '#9e9e9e',
    perks: [
      'All Bronze benefits, plus:',
      'Logo on website and event flyers',
      'Social media shoutouts (3 posts + 10 stories)',
      '3 VIP access passes',
    ],
  },
  {
    name: 'Gold',
    amount: '$1,500',
    color: '#c9973a',
    badgeColor: '#d4a017',
    featured: true,
    perks: [
      'All Silver benefits, plus:',
      'Prominent logo on all marketing materials',
      'Verbal recognition during event',
      'Daily social media story posts',
      '6 VIP access passes',
    ],
  },
  {
    name: 'Platinum',
    amount: '$2,500',
    color: '#9b8ea0',
    badgeColor: '#6ca0dc',
    perks: [
      'All Gold benefits, plus:',
      'Top-tier logo placement',
      'Banner / signage at event',
      'Opportunity to speak briefly',
      '8 VIP access passes',
    ],
  },
  {
    name: 'Title Sponsor',
    amount: '$5,000+',
    color: '#c0392b',
    badgeColor: '#2c2c2c',
    perks: [
      'Event naming rights ("Presented by [Your Name]")',
      'Premium logo placement everywhere',
      'Featured in all press and promotional content',
      'Speak at the event',
      '10 VIP access passes',
      'Custom brand integration opportunities',
    ],
  },
]

export default function SponsorsPage() {
  const honeypotRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({ businessName: '', contactName: '', email: '', phone: '', tier: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/sponsor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, website: honeypotRef.current?.value ?? '' }) })
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
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>The Day Party @ Canvas — August 1, 2026</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            Become a Sponsor
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.7 }}>
            Partner with the Eritrean Scholars Fund and support education while gaining meaningful exposure to an engaged community audience.
          </p>
        </div>
      </section>

      {/* Closed notice */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>Get in Touch</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '0.5rem' }}>
            Sponsorship Inquiry
          </h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Fill out the form below and we'll be in touch within 48 hours.</p>

          <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'white', border: '1.5px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>✕</div>
              <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.6rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>Inquiries Temporarily Closed</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>The sponsorship inquiry form is not currently available. Please check back later.</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Questions? Email{' '}
                <a href="mailto:admin@lonestareritreanscholars.org" style={{ color: 'var(--forest)' }}>
                  admin@lonestareritreanscholars.org
                </a>
              </p>
            </div>
          {false && (
            <form onSubmit={handleSubmit} style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: '4px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden', opacity: 0 }} />
              <div className="field-row">
                <div className="field">
                  <label htmlFor="businessName">Business Name <span className="req">✦</span></label>
                  <input type="text" id="businessName" value={form.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Acme Corp" required />
                </div>
                <div className="field">
                  <label htmlFor="contactName">Contact Name <span className="req">✦</span></label>
                  <input type="text" id="contactName" value={form.contactName} onChange={e => set('contactName', e.target.value)} placeholder="Jane Doe" required />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="sp-email">Email <span className="req">✦</span></label>
                  <input type="email" id="sp-email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@acme.com" required />
                </div>
                <div className="field">
                  <label htmlFor="sp-phone">Phone</label>
                  <input type="tel" id="sp-phone" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="sp-tier">Tier Interested In <span className="req">✦</span></label>
                <select id="sp-tier" value={form.tier} onChange={e => set('tier', e.target.value)} required>
                  <option value="">Select a tier</option>
                  {TIERS.map(t => <option key={t.name} value={t.name}>{t.name} — {t.amount}</option>)}
                  <option value="Custom / In-Kind">Custom / In-Kind Package</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="sp-message">Message</label>
                <textarea id="sp-message" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your business and any questions you have..." style={{ minHeight: '110px' }} />
              </div>
              {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{error}</p>}
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-end', paddingRight: '2rem' }}>
                {loading ? 'Sending…' : 'Send Inquiry →'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

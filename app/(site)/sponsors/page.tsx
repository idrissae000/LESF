'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

const TIERS = [
  {
    name: 'Bronze',
    amount: '$500',
    color: '#a0785a',
    badge: '🟢',
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
    badge: '🔵',
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
    badge: '🟣',
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
    badge: '🟡',
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
    badge: '🔴',
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
  const [form, setForm] = useState({ businessName: '', contactName: '', email: '', phone: '', tier: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/sponsor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
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
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>The Giveback Kickback — August 1, 2026</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            Become a Sponsor
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.7 }}>
            Partner with the Lonestar Eritrean Scholars Fund and support education while gaining meaningful exposure to an engaged community audience.
          </p>
        </div>
      </section>

      {/* Why sponsor */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>Why Sponsor?</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '1.25rem' }}>
            Your Investment. Our Community.
          </h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem', lineHeight: 1.75, fontSize: '0.97rem' }}>
            We are hosting a high-energy social event on August 1, 2026, bringing together community members, professionals, and supporters. We anticipate 250+ attendees, with marketing and social media reach extending to thousands of people.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.25rem' }}>
            {[
              { icon: '🎓', title: 'Support Education', body: 'Directly fund a $3,000 scholarship for a deserving Eritrean-American student.' },
              { icon: '📣', title: 'Brand Exposure', body: 'Reach 250+ event attendees and thousands through our marketing and social media.' },
              { icon: '🤝', title: 'Social Responsibility', body: 'Enhance your brand profile through meaningful community involvement.' },
              { icon: '💼', title: 'Tax Benefits', body: 'Qualifies as a 501(c)(3) charitable donation and as a business expense for federal taxes.' },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', borderTop: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.65rem' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.1rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>Sponsorship Packages</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '3rem' }}>
            Choose Your Tier
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '1.25rem' }}>
            {TIERS.map(({ name, amount, color, badge, featured, perks }) => (
              <div key={name} style={{ background: featured ? 'var(--forest)' : 'var(--cream)', border: `2px solid ${featured ? 'var(--gold)' : 'var(--border)'}`, borderRadius: '4px', padding: '1.75rem', position: 'relative', color: featured ? 'white' : 'inherit' }}>
                {featured && <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--forest)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.2rem 0.75rem', borderRadius: '0 0 4px 4px' }}>Most Popular</div>}
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{badge}</div>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.4rem', fontWeight: 600, color: featured ? 'var(--gold-light)' : 'var(--forest)', marginBottom: '0.25rem' }}>{name}</h3>
                <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-cormorant), serif', fontWeight: 600, color: featured ? 'white' : color, marginBottom: '1.25rem' }}>{amount}</div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {perks.map(p => (
                    <li key={p} style={{ fontSize: '0.82rem', lineHeight: 1.55, color: featured ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✦</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', background: 'var(--cream-dark)', border: '1px solid var(--border)', borderLeft: '4px solid var(--gold)', borderRadius: '0 4px 4px 0', padding: '1rem 1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text)' }}>Additional Opportunities:</strong> In-kind sponsorships (products or services) and custom sponsorship packages are available upon request.
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>Get in Touch</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '0.5rem' }}>
            Sponsorship Inquiry
          </h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Fill out the form below and we'll be in touch within 48 hours.</p>

          {success ? (
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'white', border: '1.5px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--forest)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.5rem', color: 'white' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.6rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>Inquiry Received</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Thank you for your interest in sponsoring the Lonestar Eritrean Scholars Fund. We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: '4px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

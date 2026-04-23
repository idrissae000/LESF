import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'The Giveback Kickback — Lonestar Eritrean Scholars Fund' }

export default function EventPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>August 1, 2026</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 600, lineHeight: 1.1, marginBottom: '1rem' }}>
            The Giveback Kickback
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
            A high-energy community celebration bringing together young Eritreans, professionals, and supporters for a meaningful cause.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section style={{ background: 'var(--forest-mid)', borderBottom: '1px solid rgba(201,151,58,0.25)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
          {[
            { val: 'Aug 1, 2026', label: 'Event Date' },
            { val: '250+', label: 'Expected Attendees' },
            { val: '$3,000', label: 'Scholarship Awarded' },
            { val: 'Aug 2', label: 'Winner Announced' },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.8rem', color: 'var(--gold-light)', fontWeight: 600 }}>{val}</div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Event Overview</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '1.5rem' }}>
            Community, Celebration & Purpose
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.97rem' }}>
            We are hosting a high-energy social event on August 1, 2026, designed to bring together community members, professionals, and supporters for a meaningful cause. The Giveback Kickback aims to connect young Eritreans — young and old — to gather together for a higher purpose.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.97rem' }}>
            The event will culminate in the awarding of a $3,000 scholarship to a deserving Eritrean-American community member in North America — with the winner announced on August 2, 2026.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.97rem' }}>
            We anticipate hosting at least 250 people at the event, and our marketing and social media reach will extend to thousands of community members across North America.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>What to Expect</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '3rem' }}>
            An Evening to Remember
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🎉', title: 'Community Celebration', body: 'A vibrant gathering of Eritrean-Americans from Dallas and beyond, celebrating culture and togetherness.' },
              { icon: '🏆', title: 'Scholarship Award', body: 'One deserving student will be awarded a $3,000 scholarship live at the event on August 1.' },
              { icon: '🤝', title: 'Networking', body: 'Connect with professionals, community leaders, sponsors, and fellow Eritrean-Americans.' },
              { icon: '📢', title: 'Wide Reach', body: 'Marketing and social media will amplify the event to thousands of community members across North America.' },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.75rem', borderTop: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', color: 'var(--forest)', marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets coming soon */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 600, marginBottom: '1rem' }}>
            Tickets Coming Soon
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Ticket details will be announced shortly. In the meantime, if you're interested in sponsoring the event, we'd love to hear from you.
          </p>
          <Link href="/sponsors" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, padding: '0.9rem 2.5rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Become a Sponsor
          </Link>
        </div>
      </section>
    </>
  )
}

'use client'

export default function DonateForm() {
  return (
    <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>✕</div>
        <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '1rem' }}>
          Donations Temporarily Unavailable
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.97rem', marginBottom: '1.5rem' }}>
          Online donations are not currently available. Please check back later or reach out to us directly.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Questions? Email{' '}
          <a href="mailto:admin@lonestareritreanscholars.org" style={{ color: 'var(--forest)' }}>
            admin@lonestareritreanscholars.org
          </a>
        </p>
      </div>
    </section>
  )
}

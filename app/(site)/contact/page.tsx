export default function ContactPage() {
  return (
    <>
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Reach Out</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            Get In Touch
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.7 }}>
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: '4px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>Email</span>
              <a href="mailto:admin@lonestareritreanscholars.org" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.3rem', color: 'var(--forest)', textDecoration: 'none', fontWeight: 600 }}>
                admin@lonestareritreanscholars.org
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--border)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>Phone</span>
              <a href="tel:9726978878" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.3rem', color: 'var(--forest)', textDecoration: 'none', fontWeight: 600 }}>
                972-697-8878
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--border)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>Instagram</span>
              <a href="https://www.instagram.com/eritreanscholarsfund" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.3rem', color: 'var(--forest)', textDecoration: 'none', fontWeight: 600 }}>
                @eritreanscholarsfund
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--border)' }} />

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
              Interested in sponsoring our event or scholarship?{' '}
              <a href="/sponsors" style={{ color: 'var(--forest)', fontWeight: 500 }}>Visit the Sponsors page</a>{' '}
              to learn about partnership opportunities and reach out directly.
            </p>

          </div>
        </div>
      </section>
    </>
  )
}

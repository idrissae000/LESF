import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Donate — Lonestar Eritrean Scholars Fund' }

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Give Back</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            Support the Fund
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.7 }}>
            Your donation directly supports a deserving Eritrean-American student's education and future.
          </p>
        </div>
      </section>

      {/* Why donate */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Why Donate?</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '1.5rem' }}>
            Every Dollar Counts
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.97rem' }}>
            The Lonestar Eritrean Scholars Fund is a 501(c)(3) non-profit organization. All donations are tax deductible and go directly toward funding the scholarship award.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.97rem' }}>
            Community donations — large and small — are what make this scholarship possible. By contributing, you're investing in the education of a promising young Eritrean-American and strengthening our community for generations to come.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.25rem', marginTop: '3rem' }}>
            {[
              { icon: '🎓', title: 'Fund the Scholarship', body: 'Donations go directly toward the $3,000 annual scholarship award.' },
              { icon: '🏛️', title: '501(c)(3) Tax Deductible', body: 'We are a registered non-profit. Your donation qualifies as a tax deduction.' },
              { icon: '🌍', title: 'Strengthen Our Community', body: 'Investing in education lifts the entire Eritrean-American community.' },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ background: 'white', border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', borderRadius: '4px', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.65rem' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment coming soon */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Online Giving</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '1rem' }}>
            Online Donations Coming Soon
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.95rem' }}>
            We are currently setting up our secure online donation portal. Check back soon — in the meantime, please reach out to us directly if you'd like to contribute.
          </p>
          <div style={{ display: 'inline-block', background: 'var(--cream-dark)', border: '1.5px solid var(--border)', borderRadius: '4px', padding: '1.25rem 2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            💛 Payment integration coming soon
          </div>
        </div>
      </section>

      {/* CTA to sponsors */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 600, marginBottom: '1rem' }}>
            Are You a Business?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Consider sponsoring the event. Business sponsors receive brand exposure, VIP passes, and recognition in front of 250+ attendees.
          </p>
          <Link href="/sponsors" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, padding: '0.9rem 2.5rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            View Sponsorship Tiers
          </Link>
        </div>
      </section>
    </>
  )
}

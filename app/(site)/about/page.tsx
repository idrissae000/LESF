import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About — Lonestar Eritrean Scholars Fund' }

const detail = (label: string, value: string) => ({ label, value })
const DETAILS = [
  detail('Award Amount', '$3,000'),
  detail('Recipients', '1 student'),
  detail('Application Opens', 'May 15, 2026'),
  detail('Application Closes', 'July 15, 2026'),
  detail('Winner Announced', 'August 2, 2026'),
  detail('Eligible Majors', 'All majors welcome'),
]

const req = (text: string) => text
const ELIGIBILITY = [
  req('Currently enrolled as an undergraduate student'),
  req('21 years of age or older'),
  req('Identifies as Eritrean-American'),
  req('All majors and fields of study are welcome'),
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(201,151,58,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>First Annual Scholarship</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            About the Fund
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '580px' }}>
            The Lonestar Eritrean Scholars Fund was founded by members of the Eritrean community in Dallas to support young college students achieve their dreams.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Our Story</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '1.5rem' }}>
            Community-Founded. Community-Driven.
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.97rem' }}>
            This Fund was founded by members of the Eritrean community in Dallas in order to support young college students achieve their dreams. We believe that investing in education is one of the most powerful ways to strengthen and uplift our community.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.97rem' }}>
            The Lonestar Eritrean Scholars Fund is proud to present its first annual scholarship — a $3,000 award given to one deserving Eritrean-American undergraduate student. Our mission is to provide meaningful financial support and encouragement, recognizing the hard work and potential of our community's rising generation.
          </p>
        </div>
      </section>

      {/* Scholarship details */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem' }}>
          <div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Scholarship Details</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2rem', fontWeight: 600, color: 'var(--forest)', marginBottom: '1.5rem' }}>
              The Numbers
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {DETAILS.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Eligibility</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2rem', fontWeight: 600, color: 'var(--forest)', marginBottom: '1.5rem' }}>
              Who Can Apply?
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {ELIGIBILITY.map((item) => (
                <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 600, marginBottom: '1rem' }}>
            Think You Qualify?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Applications are open May 15 – July 15, 2026. Don't miss your opportunity.
          </p>
          <Link href="/apply" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, padding: '0.9rem 2.5rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Apply Now
          </Link>
        </div>
      </section>
    </>
  )
}

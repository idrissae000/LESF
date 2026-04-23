import Link from 'next/link'
import ScrollReveal from '@/components/site/ScrollReveal'

const stat = (val: string, label: string) => ({ val, label })
const STATS = [
  stat('$3,000', 'Award Amount'),
  stat('1', 'Recipient'),
  stat('May 15 – Jul 15', 'Application Window'),
  stat('Aug 2', 'Winner Announced'),
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '6rem 1.5rem 5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          <p data-hero-item style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>First Annual Scholarship — 2026</p>
          <h1 data-hero-item style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 600, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Investing in the Next Generation<br /><em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>of Eritrean Leaders.</em>
          </h1>
          <p data-hero-item style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '560px', margin: '0 auto 2rem' }}>
            The Lonestar Eritrean Scholars Fund supports promising Eritrean-American undergraduate students as they pursue their academic dreams.
          </p>
          <div data-hero-item>
            <Link href="/apply" className="btn btn-primary" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, padding: '0.9rem 2.5rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: 'var(--forest-mid)', borderBottom: '1px solid rgba(201,151,58,0.25)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
          {STATS.map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.8rem', color: 'var(--gold-light)', fontWeight: 600 }}>{val}</div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <ScrollReveal>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>About the Fund</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                Rooted in Community.<br />Driven by Purpose.
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                This Fund was founded by members of the Eritrean community in Dallas in order to support young college students achieve their dreams.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Our mission is to provide financial support and encouragement to a promising Eritrean-American college student — recognizing their hard work and investing in their future.
              </p>
            </div>
            <div style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2rem', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.35rem', color: 'var(--forest)', lineHeight: 1.6, fontStyle: 'italic' }}>
                &ldquo;Education is the most powerful tool we can give to the next generation of our community.&rdquo;
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', letterSpacing: '0.04em' }}>— Lonestar Eritrean Scholars Fund</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Highlights */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>Scholarship Details</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '3rem' }}>
              Everything You Need to Know
            </h2>
          </ScrollReveal>
          <ScrollReveal group style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem' }}>
            {[
              { title: '$3,000 Award', body: 'One scholarship awarded to a deserving Eritrean-American undergraduate student.' },
              { title: 'All Majors Welcome', body: 'We support students across every field of study. Your passion matters more than your major.' },
              { title: 'Application Window', body: 'Applications open May 15 and close July 15. Submit early — don\'t miss your chance.' },
              { title: 'Winner Announced Aug 2', body: 'The scholarship recipient will be announced at The Giveback Kickback event on August 1.' },
            ].map(({ title, body }) => (
              <div key={title} className="card-lift" style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.75rem', borderTop: '3px solid var(--gold)' }}>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', color: 'var(--forest)', marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <ScrollReveal>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, marginBottom: '1rem' }}>
              Ready to Apply?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Applications are open May 15 – July 15, 2026. Take the next step toward your future.
            </p>
            <Link href="/apply" className="btn btn-primary" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, padding: '0.9rem 2.5rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Start Your Application
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}

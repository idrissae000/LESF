import Link from 'next/link'
import ScrollReveal from '@/components/site/ScrollReveal'

export default function HomePage() {
  return (
    <>
      {/* Hero — asymmetric, personal */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5.5rem 1.5rem 4.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 20%, rgba(201,151,58,0.15) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,151,58,0.4), transparent)' }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left column: text */}
          <div>
            <p data-hero-item style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.1rem' }}>Dallas, Texas · Est. 2026</p>
            <h1 data-hero-item style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 600, lineHeight: 1.08, marginBottom: '1.5rem' }}>
              A scholarship<br />born from our<br /><em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>community.</em>
            </h1>
            <p data-hero-item style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '420px' }}>
              The Lonestar Eritrean Scholars Fund awards a $3,000 scholarship to a deserving Eritrean-American undergraduate student each year.
            </p>
            <div data-hero-item style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/apply" className="btn btn-primary" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Apply Now →
              </Link>
              <Link href="/about" style={{ display: 'inline-block', color: 'rgba(255,255,255,0.7)', padding: '0.85rem 0', textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255,255,255,0.25)', transition: 'color 0.2s, border-color 0.2s' }}>
                Learn more
              </Link>
            </div>
          </div>

          {/* Right column: key facts card */}
          <div data-hero-item style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,151,58,0.3)', borderRadius: '6px', padding: '2rem', backdropFilter: 'blur(4px)' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>2026 Scholarship</p>
            {[
              ['Award', '$3,000'],
              ['Recipients', '1 student'],
              ['Open', 'May 15 – July 15'],
              ['Announced', 'August 2, 2026'],
              ['Eligibility', 'Eritrean-American undergrads'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>{label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--gold-light)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission — personal, not corporate */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <ScrollReveal>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Why We Started This</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              We built this for the student<br />who almost didn&apos;t apply.
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '1rem', maxWidth: '640px' }}>
              The Eritrean community in Dallas has always taken care of its own — through family, through faith, through showing up. This scholarship is another way of showing up. It was created by community members who wanted to invest in the next generation not just with words, but with real support.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '1rem', maxWidth: '640px' }}>
              If you&apos;re an Eritrean-American student working hard toward your degree, this fund was made for you.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* How it works — 3 steps, simple */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>How It Works</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '2.5rem' }}>
              Three steps. That&apos;s it.
            </h2>
          </ScrollReveal>
          <ScrollReveal group style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '2rem' }}>
            {[
              { num: '01', title: 'Submit your application', body: 'Fill out the online form between May 15 and July 15. Share your story, your goals, and your documents.' },
              { num: '02', title: 'We review every application', body: 'Our committee reads every submission carefully. We\'re looking for drive, community connection, and academic commitment.' },
              { num: '03', title: 'Winner announced Aug 2', body: 'The recipient is announced live at The Giveback Kickback event on August 1, 2026 in Dallas.' },
            ].map(({ num, title, body }) => (
              <div key={num} className="card-lift" style={{ padding: '1.75rem', borderTop: '3px solid var(--gold)', background: 'var(--cream)', borderRadius: '0 0 4px 4px' }}>
                <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2.5rem', fontWeight: 600, color: 'var(--gold)', opacity: 0.35, lineHeight: 1, marginBottom: '0.75rem' }}>{num}</div>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Event teaser */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <ScrollReveal>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>August 1, 2026</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.2, marginBottom: '1rem' }}>
                The Giveback Kickback
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.97rem' }}>
                A community event in Dallas bringing together 250+ attendees to celebrate Eritrean-American excellence. The scholarship winner will be announced live at the event.
              </p>
              <Link href="/event" style={{ color: 'var(--forest)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.04em', borderBottom: '1px solid var(--gold)', paddingBottom: '1px' }}>
                Event details →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { val: '250+', label: 'Expected Attendees' },
                { val: '$3,000', label: 'Scholarship Awarded Live' },
                { val: 'Dallas, TX', label: 'Location' },
              ].map(({ val, label }) => (
                <div key={label} style={{ background: 'white', border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)', borderRadius: '0 4px 4px 0', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', fontWeight: 600, color: 'var(--forest)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Mentorship CTA */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <ScrollReveal>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Mentorship Program</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.2, marginBottom: '1rem' }}>
                Want to give back?<br />Become a mentor.
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.97rem', maxWidth: '420px' }}>
                Mentors are paired with Eritrean-American students to offer guidance, share their professional experience, and invest in the next generation of our community. Your story matters too.
              </p>
              <Link href="/mentorship" className="btn btn-primary" style={{ display: 'inline-block', background: 'var(--forest)', color: 'white', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Apply to Mentor →
              </Link>
            </div>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2rem', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.3rem', color: 'var(--forest)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                &ldquo;The most meaningful thing I can do is help a young Eritrean-American see what&apos;s possible — because someone did that for me.&rdquo;
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Share your professional journey', 'Open doors and make introductions', 'Meet monthly — on your schedule'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '1px' }}>✦</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <ScrollReveal>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Applications Open May 15</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.15 }}>
              Your story matters.<br />Don&apos;t wait.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.97rem' }}>
              Applications close July 15, 2026. It takes 15 minutes and could change everything.
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

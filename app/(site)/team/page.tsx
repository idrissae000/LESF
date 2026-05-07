import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Our Team — Lonestar Eritrean Scholars Fund' }

const TEAM = [
  {
    photo: '/team/eddy.jpg',
    photoPosition: '38% 70%',
    name: 'Edekel Tecle',
    title: 'Director, Co-Founder',
    bio: [
      'Edekel "Eddy" Tecle is a practicing attorney specializing in criminal defense and personal injury law, with experience litigating cases in both state and federal courts across Texas. Raised in the Dallas area, he earned his Bachelor\'s degree in Political Science from the University of Houston in 2010 and his law degree from the University of Texas School of Law at Austin in 2013.',
      'He is the Co-Founder and Director of the Lonestar Eritrean Scholars Fund, where he is committed to expanding opportunity and building pathways for student success through mentorship, advocacy, and community engagement. In addition to his work with the Fund, Eddy is a director of Nahid\'s Kids Rise & Bloom, a non-profit whose mission is to support children and youth involved with the foster care system in the Houston area.',
    ],
  },
  {
    photo: '/team/matthew.jpg',
    photoPosition: 'top center',
    name: 'Meron Mesfin',
    title: 'Director, Co-Founder',
    bio: [
      'Meron Mesfin is a construction project manager overseeing high level operations for multifamily developments in North Texas. He leads project execution through subcontractor coordination, scheduling, contract negotiations, budgeting, and quality control, ensuring complex projects are delivered efficiently and to a high standard.',
      'He began his career as a home warranty plumber in the Dallas Fort Worth area and later transitioned into new construction plumbing in New Orleans while earning his associate degree in Civil and Construction Applied Engineering Technology. That hands-on experience shaped his understanding of how projects come together and fueled his commitment to building both physical structures and stronger communities. He later earned a bachelor\'s degree in Construction Management from University of Houston, along with a double minor in Business Management and Entrepreneurship from the Bauer College of Business.',
      'As an Eritrean American and co-founder of the Lonestar Eritrean Scholars Fund, Meron is committed to expanding access to education for college students. His background in discipline, execution, and problem solving directly supports the organization\'s mission to provide scholarships, mentorship, and resources, helping create pathways for the next generation to succeed.',
    ],
  },
]

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
          <p data-hero-item style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            The People Behind the Fund
          </p>
          <h1 data-hero-item style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            Meet Our Team
          </h1>
          <p data-hero-item style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.75 }}>
            The Lonestar Eritrean Scholars Fund was founded by two Dallas-area Eritrean-Americans who believe that community investment starts with education. They built this fund to make that belief real.
          </p>
        </div>
      </section>

      {/* Team cards */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {TEAM.map(({ photo, photoPosition, name, title, bio }) => (
            <div
              key={name}
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', overflow: 'hidden', background: 'var(--forest)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: photoPosition,
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '1.75rem 2rem 2rem' }}>
                {/* Name / title */}
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <h2 style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '1.7rem',
                    fontWeight: 600,
                    color: 'var(--forest)',
                    lineHeight: 1.1,
                    marginBottom: '0.3rem',
                  }}>
                    {name}
                  </h2>
                  <p style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 500,
                  }}>
                    {title}
                  </p>
                </div>

                {/* Bio paragraphs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {bio.map((para, i) => (
                    <p key={i} style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '4rem 1.5rem', textAlign: 'center', borderTop: '1px solid rgba(201,151,58,0.25)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 600, marginBottom: '0.75rem' }}>
            Questions or want to get involved?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            We&apos;d love to hear from you — whether you&apos;re a prospective applicant, sponsor, or mentor.
          </p>
          <a
            href="/contact"
            className="btn btn-primary"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, padding: '0.85rem 2.25rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  )
}

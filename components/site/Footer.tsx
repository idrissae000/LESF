import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--forest)', borderTop: '2px solid var(--gold)', color: 'rgba(255,255,255,0.6)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '0.35rem' }}>
            Lonestar Eritrean Scholars Fund
          </div>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}>
            © 2026 Lonestar Eritrean Scholars Fund. All rights reserved.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { href: '/',           label: 'Home' },
            { href: '/about',      label: 'About' },
            { href: '/event',      label: 'Event' },
            { href: '/mentorship', label: 'Mentorship' },
            { href: '/sponsors',   label: 'Sponsors' },
            { href: '/donate',     label: 'Donate' },
            { href: '/contact',    label: 'Contact' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

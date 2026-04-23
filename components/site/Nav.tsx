'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/apply',    label: 'Apply' },
  { href: '/event',    label: 'Event' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/donate',   label: 'Donate' },
  { href: '/contact',  label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav style={{ background: 'var(--forest)', borderBottom: '2px solid var(--gold)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--gold-light)', letterSpacing: '0.02em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Lonestar Eritrean Scholars Fund
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="nav-desktop">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            const isApply = href === '/apply'
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: isApply ? '0.45rem 1.1rem' : '0.45rem 0.85rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '3px',
                  fontWeight: isApply ? 600 : 400,
                  transition: 'all 0.15s',
                  background: isApply ? 'var(--gold)' : 'transparent',
                  color: isApply ? 'var(--forest)' : active ? 'white' : 'rgba(255,255,255,0.65)',
                  borderBottom: active && !isApply ? '2px solid var(--gold)' : '2px solid transparent',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="nav-hamburger"
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
        >
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', margin: '4px 0', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', margin: '4px 0', transition: 'all 0.2s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', margin: '4px 0', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile-menu" style={{ background: 'var(--forest-mid)', borderTop: '1px solid rgba(201,151,58,0.3)', padding: '0.75rem 1.5rem 1rem' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '0.7rem 0',
                fontSize: '0.88rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: pathname === href ? 'var(--gold-light)' : 'rgba(255,255,255,0.8)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

    </nav>
  )
}

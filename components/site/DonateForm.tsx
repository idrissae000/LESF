'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const PRESET_AMOUNTS = [25, 50, 100, 250, 500]

export default function DonateForm() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success') === 'true'

  const [selected, setSelected] = useState<number | 'custom'>(50)
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (success) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [success])

  if (success) {
    return (
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>✦</div>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Thank You</p>
          <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '1rem' }}>
            Your Donation Was Received
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.97rem', marginBottom: '2rem' }}>
            Thank you for supporting the Eritrean Scholars Fund. Your contribution directly funds a deserving student's education. A receipt has been sent to your email — this donation is tax-deductible under our 501(c)(3) status.
          </p>
          <a
            href="/donate"
            style={{ display: 'inline-block', background: 'var(--forest)', color: 'white', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '3px', textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Make Another Donation
          </a>
        </div>
      </section>
    )
  }

  async function handleDonate() {
    setError('')
    const dollars = selected === 'custom' ? parseFloat(custom) : selected
    if (!dollars || dollars < 1 || isNaN(dollars)) {
      setError('Please enter a valid donation amount (minimum $1).')
      return
    }
    const cents = Math.round(dollars * 100)

    setLoading(true)
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cents }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Could not initiate checkout. Please try again.')
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem', textAlign: 'center' }}>Online Giving</p>
        <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '0.5rem', textAlign: 'center' }}>
          Make a Donation
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2.5rem', textAlign: 'center' }}>
          100% tax-deductible · 501(c)(3) charitable organization
        </p>

        {/* Amount presets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
          {PRESET_AMOUNTS.map(amt => (
            <button
              key={amt}
              type="button"
              onClick={() => { setSelected(amt); setCustom('') }}
              style={{
                padding: '0.9rem 0.5rem',
                border: `2px solid ${selected === amt ? 'var(--forest)' : 'var(--border)'}`,
                borderRadius: '4px',
                background: selected === amt ? 'var(--forest)' : 'white',
                color: selected === amt ? 'white' : 'var(--text)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              ${amt}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelected('custom')}
            style={{
              padding: '0.9rem 0.5rem',
              border: `2px solid ${selected === 'custom' ? 'var(--forest)' : 'var(--border)'}`,
              borderRadius: '4px',
              background: selected === 'custom' ? 'var(--forest)' : 'white',
              color: selected === 'custom' ? 'white' : 'var(--text)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Custom
          </button>
        </div>

        {/* Custom amount input */}
        {selected === 'custom' && (
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>$</span>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Enter amount"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2rem',
                border: '2px solid var(--forest)',
                borderRadius: '4px',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              autoFocus
            />
          </div>
        )}

        {error && (
          <p style={{ color: 'var(--error)', fontSize: '0.88rem', marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: '4px' }}>
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleDonate}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? 'var(--text-muted)' : 'var(--gold)',
            color: 'var(--forest)',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {loading ? 'Redirecting to Checkout…' : `Donate${selected !== 'custom' ? ` $${selected}` : custom ? ` $${parseFloat(custom).toFixed(0)}` : ''}`}
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1.25rem', lineHeight: 1.5 }}>
          Secure checkout powered by Stripe. Your donation is tax-deductible as a charitable contribution under IRC §501(c)(3).
        </p>
      </div>
    </section>
  )
}

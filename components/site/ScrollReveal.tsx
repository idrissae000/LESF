'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  group?: boolean
  style?: React.CSSProperties
}

export default function ScrollReveal({ children, className = '', group = false, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const baseClass = group ? 'reveal-group' : 'reveal'
  return (
    <div ref={ref} className={`${baseClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}

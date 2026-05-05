'use client'

import { useState, type FormEvent } from 'react'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
  'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
  'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

const INIT = {
  firstName: '', lastName: '', city: '', state: '',
  profession: '', employer: '', degree: '', university: '',
  contactMethod: '', email: '', linkedin: '',
}

export default function MentorshipPage() {
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: false }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs: Record<string, boolean> = {}
    const req = ['firstName','lastName','city','state','profession','employer','degree','university','contactMethod','email']
    req.forEach(k => { if (!form[k as keyof typeof form].trim()) errs[k] = true })
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = true
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true); setSubmitError('')
    try {
      const res = await fetch('/api/mentorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--forest)', color: 'white', padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Give Back</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '1rem' }}>
            Become a Mentor
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.75 }}>
            Mentors are paired with Eritrean-American students to provide guidance, professional advice, and community connection. Your experience can change a student's trajectory.
          </p>
        </div>
      </section>

      {/* What mentors do */}
      <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>The Program</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '1.25rem' }}>
            Invest in the Next Generation
          </h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.8, fontSize: '0.97rem' }}>
            Our mentorship program connects community professionals with scholarship recipients and applicants. Mentors share their knowledge, open doors, and help students navigate the path ahead.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.25rem' }}>
            {[
              { icon: '🧭', title: 'Career Guidance', body: 'Help students understand their field, navigate early career decisions, and set meaningful goals.' },
              { icon: '🤝', title: 'Community Connection', body: 'Strengthen the Eritrean-American community by building bridges between generations.' },
              { icon: '💡', title: 'Professional Insight', body: 'Share lessons from your own journey — the things you wish someone had told you.' },
              { icon: '📅', title: 'Flexible Commitment', body: 'Mentorship is shaped around your schedule. Even a few conversations can make a lasting difference.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card-lift" style={{ background: 'white', border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', borderRadius: '4px', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.65rem' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section style={{ background: 'white', padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '0.75rem' }}>Apply</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: 'var(--forest)', textAlign: 'center', marginBottom: '0.5rem' }}>
            Mentor Application
          </h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
            Fill out the form below and we&apos;ll be in touch to get you matched with a student.
          </p>

          {success ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--forest)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.5rem', color: 'white' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.8rem', color: 'var(--forest)', marginBottom: '0.75rem' }}>Application Received</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '380px', margin: '0 auto' }}>
                Thank you for stepping up. We&apos;ll review your application and reach out soon to discuss next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '4px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Name row */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="mt-firstName">First Name <span className="req">✦</span></label>
                  <input
                    type="text" id="mt-firstName" value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    className={errors.firstName ? 'invalid' : ''}
                    placeholder="Jane"
                  />
                  {errors.firstName && <span className="field-error">Required.</span>}
                </div>
                <div className="field">
                  <label htmlFor="mt-lastName">Last Name <span className="req">✦</span></label>
                  <input
                    type="text" id="mt-lastName" value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    className={errors.lastName ? 'invalid' : ''}
                    placeholder="Doe"
                  />
                  {errors.lastName && <span className="field-error">Required.</span>}
                </div>
              </div>

              {/* City / State */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="mt-city">City <span className="req">✦</span></label>
                  <input
                    type="text" id="mt-city" value={form.city}
                    onChange={e => set('city', e.target.value)}
                    className={errors.city ? 'invalid' : ''}
                    placeholder="Dallas"
                  />
                  {errors.city && <span className="field-error">Required.</span>}
                </div>
                <div className="field">
                  <label htmlFor="mt-state">State <span className="req">✦</span></label>
                  <select
                    id="mt-state" value={form.state}
                    onChange={e => set('state', e.target.value)}
                    className={errors.state ? 'invalid' : ''}
                  >
                    <option value="">Select state</option>
                    {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <span className="field-error">Required.</span>}
                </div>
              </div>

              {/* Profession / Employer */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="mt-profession">Profession <span className="req">✦</span></label>
                  <input
                    type="text" id="mt-profession" value={form.profession}
                    onChange={e => set('profession', e.target.value)}
                    className={errors.profession ? 'invalid' : ''}
                    placeholder="Software Engineer"
                  />
                  {errors.profession && <span className="field-error">Required.</span>}
                </div>
                <div className="field">
                  <label htmlFor="mt-employer">Employer <span className="req">✦</span></label>
                  <input
                    type="text" id="mt-employer" value={form.employer}
                    onChange={e => set('employer', e.target.value)}
                    className={errors.employer ? 'invalid' : ''}
                    placeholder="Acme Corp"
                  />
                  {errors.employer && <span className="field-error">Required.</span>}
                </div>
              </div>

              {/* Degree / University */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="mt-degree">Degree <span className="req">✦</span></label>
                  <input
                    type="text" id="mt-degree" value={form.degree}
                    onChange={e => set('degree', e.target.value)}
                    className={errors.degree ? 'invalid' : ''}
                    placeholder="B.S. Computer Science"
                  />
                  {errors.degree && <span className="field-error">Required.</span>}
                </div>
                <div className="field">
                  <label htmlFor="mt-university">University / Institution <span className="req">✦</span></label>
                  <input
                    type="text" id="mt-university" value={form.university}
                    onChange={e => set('university', e.target.value)}
                    className={errors.university ? 'invalid' : ''}
                    placeholder="University of Texas"
                  />
                  {errors.university && <span className="field-error">Required.</span>}
                </div>
              </div>

              {/* Contact method */}
              <div className="field">
                <label htmlFor="mt-contact">Best Method of Contact <span className="req">✦</span></label>
                <select
                  id="mt-contact" value={form.contactMethod}
                  onChange={e => set('contactMethod', e.target.value)}
                  className={errors.contactMethod ? 'invalid' : ''}
                >
                  <option value="">Select preference</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
                {errors.contactMethod && <span className="field-error">Required.</span>}
              </div>

              {/* Email / LinkedIn */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="mt-email">Email Address <span className="req">✦</span></label>
                  <input
                    type="email" id="mt-email" value={form.email}
                    onChange={e => set('email', e.target.value)}
                    className={errors.email ? 'invalid' : ''}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <span className="field-error">Valid email required.</span>}
                </div>
                <div className="field">
                  <label htmlFor="mt-linkedin">LinkedIn Profile URL</label>
                  <input
                    type="url" id="mt-linkedin" value={form.linkedin}
                    onChange={e => set('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/jane"
                  />
                </div>
              </div>

              {submitError && (
                <p style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{submitError}</p>
              )}

              <div className="nav-buttons" style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span className="req">✦</span> Required field
                </span>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ paddingRight: '2rem' }}>
                  {loading ? 'Submitting…' : 'Submit Application →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

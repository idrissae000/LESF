'use client'

import { useState } from 'react'
import { INIT_FIELDS, type FormFields, type UploadedFiles } from './types'
import StepPersonal from './StepPersonal'
import StepEducation from './StepEducation'
import StepEssays from './StepEssays'
import StepUploads from './StepUploads'
import StepOptional from './StepOptional'
import StepReview from './StepReview'

const STEP_LABELS = ['Personal', 'Education', 'Essays', 'Uploads', 'Optional', 'Review']

function wordCount(text: string) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

function validate(step: number, fields: FormFields, files: UploadedFiles): Record<string, boolean> {
  const errs: Record<string, boolean> = {}

  if (step === 1) {
    if (!fields.firstName.trim()) errs.firstName = true
    if (!fields.lastName.trim()) errs.lastName = true
    if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email)) errs.email = true
    if (!fields.phone.trim()) errs.phone = true
    if (!fields.address.trim()) errs.address = true
    if (!fields.city.trim()) errs.city = true
    if (!fields.state) errs.state = true
    if (!fields.zip.trim()) errs.zip = true
    if (!fields.eligibility) errs.eligibility = true
  }

  if (step === 2) {
    if (!fields.schoolName.trim()) errs.schoolName = true
    if (!fields.gradeLevel) errs.gradeLevel = true
    if (!fields.major.trim()) errs.major = true
    const g = parseFloat(fields.gpa)
    if (!fields.gpa || isNaN(g) || g < 0 || g > 4.0) errs.gpa = true
    if (!fields.graduationYear) errs.graduationYear = true
  }

  if (step === 3) {
    if (wordCount(fields.essay1) < 200 || wordCount(fields.essay1) > 250) errs.essay1 = true
    if (wordCount(fields.essay2) < 200 || wordCount(fields.essay2) > 250) errs.essay2 = true
  }

  if (step === 4) {
    if (!files.transcript) errs.transcript = true
    if (!files.resume) errs.resume = true
    if (!files.writingSample) errs.writingSample = true
  }

  if (step === 6) {
    if (!fields.certify) errs.certify = true
  }

  return errs
}

export default function FormShell() {
  const [step, setStep] = useState(1)
  const [fields, setFields] = useState<FormFields>(INIT_FIELDS)
  const [files, setFiles] = useState<UploadedFiles>({})
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function onChange(name: keyof FormFields, value: string | boolean) {
    setFields(f => ({ ...f, [name]: value }))
    setErrors(e => ({ ...e, [name]: false }))
  }

  function onFile(name: keyof UploadedFiles, file: File) {
    setFiles(f => ({ ...f, [name]: file }))
    setErrors(e => ({ ...e, [name]: false }))
  }

  function goTo(next: number) {
    if (next > step) {
      const errs = validate(step, fields, files)
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
    }
    setErrors({})
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function onSubmit() {
    const errs = validate(6, fields, files)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setSubmitError('')
    try {
      const fd = new FormData()
      Object.entries(fields).forEach(([k, v]) => fd.append(k, String(v)))
      if (files.transcript) fd.append('transcript', files.transcript)
      if (files.resume) fd.append('resume', files.resume)
      if (files.writingSample) fd.append('writingSample', files.writingSample)

      const res = await fetch('/api/apply', { method: 'POST', body: fd })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Submission failed. Please try again.')

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
      <header className="site-header">
        <div className="logo">Lonestar Eritrean Scholars Fund</div>
        <div className="deadline">Applications close July 15, 2025</div>
      </header>

      <div className="hero">
        <div className="eyebrow">First Annual Scholarship</div>
        <h1>Invest in Your Future.<br /><em>Apply Today.</em></h1>
        <p>Supporting promising Eritrean-American undergraduate students as they pursue their academic dreams.</p>
        <div className="hero-meta">
          <div className="item"><span className="val">$3,000</span><span className="lbl">Award Amount</span></div>
          <div className="item"><span className="val">1</span><span className="lbl">Recipient</span></div>
          <div className="item"><span className="val">Aug 2</span><span className="lbl">Winner Announced</span></div>
          <div className="item"><span className="val">May 15 – Jul 15</span><span className="lbl">Application Window</span></div>
        </div>
      </div>

      {!success && (
        <div className="progress-wrap">
          <div className="progress-inner">
            {STEP_LABELS.map((label, i) => {
              const num = i + 1
              return (
                <div
                  key={num}
                  className={`step-tab${step === num ? ' active' : ''}${step > num ? ' done' : ''}`}
                >
                  {step > num ? `✓ ${num}. ${label}` : `${num}. ${label}`}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <main className="page">
        {success ? (
          <div className="success-screen">
            <div className="checkmark">✓</div>
            <h2>Application Received</h2>
            <p>
              Thank you for applying to the Lonestar Eritrean Scholars Fund. We&apos;ll be in touch
              at the email you provided. Winners will be announced on <strong>August 2, 2025</strong>.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.82rem' }}>
              Questions? Email{' '}
              <a href="mailto:eddytecle@gmail.com" style={{ color: 'var(--forest)' }}>
                eddytecle@gmail.com
              </a>
            </p>
          </div>
        ) : (
          <form noValidate>
            {step === 1 && (
              <StepPersonal
                key="step-1"
                fields={fields}
                errors={errors}
                onChange={onChange}
                onNext={() => goTo(2)}
              />
            )}
            {step === 2 && (
              <StepEducation
                key="step-2"
                fields={fields}
                errors={errors}
                onChange={onChange}
                onBack={() => goTo(1)}
                onNext={() => goTo(3)}
              />
            )}
            {step === 3 && (
              <StepEssays
                key="step-3"
                fields={fields}
                errors={errors}
                onChange={onChange}
                onBack={() => goTo(2)}
                onNext={() => goTo(4)}
              />
            )}
            {step === 4 && (
              <StepUploads
                key="step-4"
                files={files}
                errors={errors}
                onFile={onFile}
                onBack={() => goTo(3)}
                onNext={() => goTo(5)}
              />
            )}
            {step === 5 && (
              <StepOptional
                key="step-5"
                fields={fields}
                onChange={onChange}
                onBack={() => goTo(4)}
                onNext={() => goTo(6)}
              />
            )}
            {step === 6 && (
              <StepReview
                key="step-6"
                fields={fields}
                files={files}
                errors={errors}
                loading={loading}
                submitError={submitError}
                onChange={onChange}
                onBack={() => goTo(5)}
                onSubmit={onSubmit}
              />
            )}
          </form>
        )}
      </main>
    </>
  )
}

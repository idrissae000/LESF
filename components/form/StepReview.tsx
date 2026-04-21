import type { FormFields, UploadedFiles } from './types'

interface Props {
  fields: FormFields
  files: UploadedFiles
  errors: Record<string, boolean>
  loading: boolean
  submitError: string
  onChange: (name: keyof FormFields, value: boolean) => void
  onBack: () => void
  onSubmit: () => void
}

export default function StepReview({
  fields, files, errors, loading, submitError, onChange, onBack, onSubmit,
}: Props) {
  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Review &amp; Submit</h2>
        <p>Please review your information before submitting. Once submitted, you cannot edit your application.</p>
      </div>

      <div className="review-summary">
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <div className="review-section-label">Personal</div>
          <div>Name: {fields.firstName} {fields.lastName}</div>
          <div>Email: {fields.email} &nbsp;·&nbsp; Phone: {fields.phone}</div>
          <div>Address: {fields.address}, {fields.city}, {fields.state} {fields.zip}</div>

          <div className="review-section-label" style={{ marginTop: '0.75rem' }}>Education</div>
          <div>{fields.schoolName} · {fields.gradeLevel} · Major: {fields.major} · GPA: {fields.gpa}</div>
          <div>Expected Graduation: {fields.graduationYear}</div>

          <div className="review-section-label" style={{ marginTop: '0.75rem' }}>Documents</div>
          <div>
            Transcript: {files.transcript?.name ?? '—'}<br />
            Resume: {files.resume?.name ?? '—'}<br />
            Writing Sample: {files.writingSample?.name ?? '—'}
          </div>
        </div>
      </div>

      <div className="checkbox-field">
        <input
          type="checkbox"
          id="certify"
          checked={fields.certify}
          onChange={e => onChange('certify', e.target.checked)}
        />
        <label htmlFor="certify">
          <strong>Certification <span className="req">✦</span></strong>
          I certify that all information provided in this application is truthful and accurate.
          I understand that misrepresentation may result in disqualification.
        </label>
      </div>
      {errors.certify && (
        <span className="field-error" style={{ display: 'block', marginTop: '-0.75rem', marginBottom: '1rem' }}>
          You must certify that your application is accurate.
        </span>
      )}

      {submitError && <div className="submit-error">{submitError}</div>}

      <div className="nav-buttons">
        <button type="button" className="btn btn-outline" onClick={onBack} disabled={loading}>
          ← Back
        </button>
        <button type="button" className="btn btn-submit" onClick={onSubmit} disabled={loading}>
          {loading ? 'Submitting…' : 'Submit Application'}
        </button>
      </div>
    </div>
  )
}

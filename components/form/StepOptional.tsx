import type { FormFields } from './types'

interface Props {
  fields: Pick<FormFields,
    'extracurriculars' |
    'householdParents' | 'siblings' | 'currentlyWorks' | 'parentOccupations'
  >
  errors: Record<string, boolean>
  onChange: (name: keyof FormFields, value: string) => void
  onBack: () => void
  onNext: () => void
}

export default function StepOptional({ fields, errors, onChange, onBack, onNext }: Props) {
  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Additional Information</h2>
        <p>Fields marked with <span style={{ color: 'var(--gold)' }}>✦</span> are required. Extracurricular activities are optional.</p>
      </div>

      <h3 className="sub-heading">Extracurricular Activities</h3>
      <div className="field" style={{ marginBottom: '1.75rem' }}>
        <label htmlFor="extracurriculars">
          Clubs, Organizations, Sports, or Activities <span className="optional-badge">Optional</span>
        </label>
        <textarea
          id="extracurriculars"
          value={fields.extracurriculars}
          onChange={e => onChange('extracurriculars', e.target.value)}
          placeholder="List any clubs, organizations, sports teams, or other activities you participate in..."
          style={{ minHeight: '100px' }}
        />
      </div>

      <hr className="divider" />

      <h3 className="sub-heading">Financial Background</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        This information helps us understand applicants' financial circumstances. All responses are confidential.
      </p>

      <div className="field-row">
        <div className="field">
          <label htmlFor="householdParents">Do you live with both parents? <span className="req">✦</span></label>
          <select id="householdParents" value={fields.householdParents} onChange={e => onChange('householdParents', e.target.value)} className={errors.householdParents ? 'invalid' : ''}>
            <option value="">Select an option</option>
            <option>Yes</option>
            <option>No – one parent</option>
            <option>No – neither parent</option>
            <option>Other</option>
          </select>
          {errors.householdParents && <span className="field-error">Please select an option.</span>}
        </div>
        <div className="field">
          <label htmlFor="siblings">Number of Siblings <span className="req">✦</span></label>
          <select id="siblings" value={fields.siblings} onChange={e => onChange('siblings', e.target.value)} className={errors.siblings ? 'invalid' : ''}>
            <option value="">Select an option</option>
            <option>0</option><option>1</option><option>2</option>
            <option>3</option><option>4</option><option>5+</option>
          </select>
          {errors.siblings && <span className="field-error">Please select an option.</span>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="currentlyWorks">Do you currently work? <span className="req">✦</span></label>
          <select id="currentlyWorks" value={fields.currentlyWorks} onChange={e => onChange('currentlyWorks', e.target.value)} className={errors.currentlyWorks ? 'invalid' : ''}>
            <option value="">Select an option</option>
            <option>Yes, full-time</option>
            <option>Yes, part-time</option>
            <option>No</option>
          </select>
          {errors.currentlyWorks && <span className="field-error">Please select an option.</span>}
        </div>
        <div className="field">
          <label htmlFor="parentOccupations">Parents' Occupations <span className="req">✦</span></label>
          <input type="text" id="parentOccupations" value={fields.parentOccupations} onChange={e => onChange('parentOccupations', e.target.value)} className={errors.parentOccupations ? 'invalid' : ''} placeholder="e.g. Nurse, Small business owner" />
          {errors.parentOccupations && <span className="field-error">Please enter your parents' occupations.</span>}
        </div>
      </div>

      <div className="nav-buttons">
        <button type="button" className="btn btn-outline" onClick={onBack}>← Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

import type { FormFields } from './types'

interface Props {
  fields: Pick<FormFields,
    'extracurriculars' |
    'householdParents' | 'siblings' | 'currentlyWorks' | 'parentOccupations'
  >
  onChange: (name: keyof FormFields, value: string) => void
  onBack: () => void
  onNext: () => void
}

export default function StepOptional({ fields, onChange, onBack, onNext }: Props) {
  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Additional Information <span className="optional-badge">Optional</span></h2>
        <p>These questions are optional but help us learn more about you and your circumstances.</p>
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

      <h3 className="sub-heading">Financial Background <span className="optional-badge">Optional</span></h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        This information helps us understand applicants' financial circumstances. All responses are confidential.
      </p>

      <div className="field-row">
        <div className="field">
          <label htmlFor="householdParents">Do you live with both parents?</label>
          <select id="householdParents" value={fields.householdParents} onChange={e => onChange('householdParents', e.target.value)}>
            <option value="">Prefer not to say</option>
            <option>Yes</option>
            <option>No – one parent</option>
            <option>No – neither parent</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="siblings">Number of Siblings</label>
          <select id="siblings" value={fields.siblings} onChange={e => onChange('siblings', e.target.value)}>
            <option value="">Prefer not to say</option>
            <option>0</option><option>1</option><option>2</option>
            <option>3</option><option>4</option><option>5+</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="currentlyWorks">Do you currently work?</label>
          <select id="currentlyWorks" value={fields.currentlyWorks} onChange={e => onChange('currentlyWorks', e.target.value)}>
            <option value="">Prefer not to say</option>
            <option>Yes, full-time</option>
            <option>Yes, part-time</option>
            <option>No</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="parentOccupations">Parents' Occupations</label>
          <input type="text" id="parentOccupations" value={fields.parentOccupations} onChange={e => onChange('parentOccupations', e.target.value)} placeholder="e.g. Nurse, Small business owner" />
        </div>
      </div>

      <div className="nav-buttons">
        <button type="button" className="btn btn-outline" onClick={onBack}>← Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

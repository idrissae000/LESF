import type { FormFields } from './types'

interface Props {
  fields: Pick<FormFields,
    'extracurriculars' | 'volunteerWork' |
    'ref1Name' | 'ref1Title' | 'ref1Email' | 'ref1Phone' |
    'ref2Name' | 'ref2Title' | 'ref2Email' | 'ref2Phone' |
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

      <h3 className="sub-heading">Volunteer Work</h3>
      <div className="field" style={{ marginBottom: '1.25rem' }}>
        <label htmlFor="volunteerWork">
          Describe Your Volunteer Experience <span className="optional-badge">Optional</span>
        </label>
        <textarea
          id="volunteerWork"
          value={fields.volunteerWork}
          onChange={e => onChange('volunteerWork', e.target.value)}
          placeholder="Describe any volunteer work, community service, or service organizations you've been involved with..."
          style={{ minHeight: '100px' }}
        />
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        If you have volunteer experience, please provide up to 2 references below.
      </p>

      <div className="ref-block">
        <h4>Volunteer Reference 1</h4>
        <div className="field-row">
          <div className="field">
            <label htmlFor="ref1Name">Reference Name</label>
            <input type="text" id="ref1Name" value={fields.ref1Name} onChange={e => onChange('ref1Name', e.target.value)} placeholder="Full name" />
          </div>
          <div className="field">
            <label htmlFor="ref1Title">Title / Organization</label>
            <input type="text" id="ref1Title" value={fields.ref1Title} onChange={e => onChange('ref1Title', e.target.value)} placeholder="Director, Volunteer Houston" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="ref1Email">Email</label>
            <input type="email" id="ref1Email" value={fields.ref1Email} onChange={e => onChange('ref1Email', e.target.value)} placeholder="reference@org.com" />
          </div>
          <div className="field">
            <label htmlFor="ref1Phone">Phone</label>
            <input type="tel" id="ref1Phone" value={fields.ref1Phone} onChange={e => onChange('ref1Phone', e.target.value)} placeholder="(555) 000-0000" />
          </div>
        </div>
      </div>

      <div className="ref-block">
        <h4>Volunteer Reference 2</h4>
        <div className="field-row">
          <div className="field">
            <label htmlFor="ref2Name">Reference Name</label>
            <input type="text" id="ref2Name" value={fields.ref2Name} onChange={e => onChange('ref2Name', e.target.value)} placeholder="Full name" />
          </div>
          <div className="field">
            <label htmlFor="ref2Title">Title / Organization</label>
            <input type="text" id="ref2Title" value={fields.ref2Title} onChange={e => onChange('ref2Title', e.target.value)} placeholder="Coordinator, Community Center" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="ref2Email">Email</label>
            <input type="email" id="ref2Email" value={fields.ref2Email} onChange={e => onChange('ref2Email', e.target.value)} placeholder="reference@org.com" />
          </div>
          <div className="field">
            <label htmlFor="ref2Phone">Phone</label>
            <input type="tel" id="ref2Phone" value={fields.ref2Phone} onChange={e => onChange('ref2Phone', e.target.value)} placeholder="(555) 000-0000" />
          </div>
        </div>
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
          <label htmlFor="parentOccupations">Parents&apos; Occupations</label>
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

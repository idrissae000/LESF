import type { FormFields } from './types'

interface Props {
  fields: Pick<FormFields, 'schoolName'|'gradeLevel'|'major'|'gpa'|'graduationYear'>
  errors: Record<string, boolean>
  onChange: (name: keyof FormFields, value: string) => void
  onBack: () => void
  onNext: () => void
}

export default function StepEducation({ fields, errors, onChange, onBack, onNext }: Props) {
  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Education</h2>
        <p>Provide your current academic details.</p>
      </div>

      <div className="field-row single">
        <div className="field">
          <label htmlFor="schoolName">College / University Name <span className="req">✦</span></label>
          <input
            type="text"
            id="schoolName"
            value={fields.schoolName}
            onChange={e => onChange('schoolName', e.target.value)}
            className={errors.schoolName ? 'invalid' : ''}
            placeholder="University of Texas at Austin"
          />
          {errors.schoolName && <span className="field-error">Please enter your school name.</span>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="gradeLevel">Grade Level <span className="req">✦</span></label>
          <select
            id="gradeLevel"
            value={fields.gradeLevel}
            onChange={e => onChange('gradeLevel', e.target.value)}
            className={errors.gradeLevel ? 'invalid' : ''}
          >
            <option value="">Select level</option>
            <option>Freshman (1st Year)</option>
            <option>Sophomore (2nd Year)</option>
            <option>Junior (3rd Year)</option>
            <option>Senior (4th Year)</option>
            <option>5th Year / Super Senior</option>
          </select>
          {errors.gradeLevel && <span className="field-error">Please select your grade level.</span>}
        </div>
        <div className="field">
          <label htmlFor="major">Major / Field of Study <span className="req">✦</span></label>
          <input
            type="text"
            id="major"
            value={fields.major}
            onChange={e => onChange('major', e.target.value)}
            className={errors.major ? 'invalid' : ''}
            placeholder="Business Administration"
          />
          {errors.major && <span className="field-error">Please enter your major.</span>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="gpa">Cumulative GPA <span className="req">✦</span></label>
          <input
            type="number"
            id="gpa"
            value={fields.gpa}
            onChange={e => onChange('gpa', e.target.value)}
            className={errors.gpa ? 'invalid' : ''}
            placeholder="3.75"
            min="0.0"
            max="4.0"
            step="0.01"
          />
          {errors.gpa && <span className="field-error">Please enter a valid GPA (0.0 – 4.0).</span>}
        </div>
        <div className="field">
          <label htmlFor="graduationYear">Expected Graduation Year <span className="req">✦</span></label>
          <select
            id="graduationYear"
            value={fields.graduationYear}
            onChange={e => onChange('graduationYear', e.target.value)}
            className={errors.graduationYear ? 'invalid' : ''}
          >
            <option value="">Select year</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
            <option>2029</option>
            <option>2030+</option>
          </select>
          {errors.graduationYear && <span className="field-error">Please select a graduation year.</span>}
        </div>
      </div>

      <div className="nav-buttons">
        <button type="button" className="btn btn-outline" onClick={onBack}>← Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

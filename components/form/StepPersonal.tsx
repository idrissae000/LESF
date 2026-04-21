import type { FormFields } from './types'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
  'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
  'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

interface Props {
  fields: Pick<FormFields, 'firstName'|'lastName'|'email'|'phone'|'address'|'city'|'state'|'zip'|'eligibility'>
  errors: Record<string, boolean>
  onChange: (name: keyof FormFields, value: string | boolean) => void
  onNext: () => void
}

export default function StepPersonal({ fields, errors, onChange, onNext }: Props) {
  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Personal Information</h2>
        <p>Tell us a little about yourself. All fields marked with <span style={{ color: 'var(--gold)' }}>✦</span> are required.</p>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="firstName">First Name <span className="req">✦</span></label>
          <input
            type="text"
            id="firstName"
            value={fields.firstName}
            onChange={e => onChange('firstName', e.target.value)}
            className={errors.firstName ? 'invalid' : ''}
            placeholder="Jane"
          />
          {errors.firstName && <span className="field-error">Please enter your first name.</span>}
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name <span className="req">✦</span></label>
          <input
            type="text"
            id="lastName"
            value={fields.lastName}
            onChange={e => onChange('lastName', e.target.value)}
            className={errors.lastName ? 'invalid' : ''}
            placeholder="Doe"
          />
          {errors.lastName && <span className="field-error">Please enter your last name.</span>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">Email Address <span className="req">✦</span></label>
          <input
            type="email"
            id="email"
            value={fields.email}
            onChange={e => onChange('email', e.target.value)}
            className={errors.email ? 'invalid' : ''}
            placeholder="jane@email.com"
          />
          {errors.email && <span className="field-error">Please enter a valid email address.</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone Number <span className="req">✦</span></label>
          <input
            type="tel"
            id="phone"
            value={fields.phone}
            onChange={e => onChange('phone', e.target.value)}
            className={errors.phone ? 'invalid' : ''}
            placeholder="(555) 000-0000"
          />
          {errors.phone && <span className="field-error">Please enter your phone number.</span>}
        </div>
      </div>

      <div className="field-row single">
        <div className="field">
          <label htmlFor="address">Street Address <span className="req">✦</span></label>
          <input
            type="text"
            id="address"
            value={fields.address}
            onChange={e => onChange('address', e.target.value)}
            className={errors.address ? 'invalid' : ''}
            placeholder="123 Main Street"
          />
          {errors.address && <span className="field-error">Please enter your street address.</span>}
        </div>
      </div>

      <div className="field-row triple">
        <div className="field">
          <label htmlFor="city">City <span className="req">✦</span></label>
          <input
            type="text"
            id="city"
            value={fields.city}
            onChange={e => onChange('city', e.target.value)}
            className={errors.city ? 'invalid' : ''}
            placeholder="Dallas"
          />
          {errors.city && <span className="field-error">Required.</span>}
        </div>
        <div className="field">
          <label htmlFor="state">State <span className="req">✦</span></label>
          <select
            id="state"
            value={fields.state}
            onChange={e => onChange('state', e.target.value)}
            className={errors.state ? 'invalid' : ''}
          >
            <option value="">Select state</option>
            {US_STATES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <span className="field-error">Required.</span>}
        </div>
        <div className="field">
          <label htmlFor="zip">ZIP Code <span className="req">✦</span></label>
          <input
            type="text"
            id="zip"
            value={fields.zip}
            onChange={e => onChange('zip', e.target.value)}
            className={errors.zip ? 'invalid' : ''}
            placeholder="75201"
            maxLength={10}
          />
          {errors.zip && <span className="field-error">Required.</span>}
        </div>
      </div>

      <hr className="divider" />

      <div className="checkbox-field">
        <input
          type="checkbox"
          id="eligibility"
          checked={fields.eligibility}
          onChange={e => onChange('eligibility', e.target.checked)}
        />
        <label htmlFor="eligibility">
          <strong>Eligibility Confirmation <span className="req">✦</span></strong>
          I confirm that I am currently enrolled as an undergraduate student, am 21 years of age or older, and identify as Eritrean-American. I understand this scholarship is open to all majors.
        </label>
      </div>
      {errors.eligibility && (
        <span className="field-error" style={{ display: 'block', marginTop: '-0.75rem', marginBottom: '1rem' }}>
          You must confirm your eligibility to continue.
        </span>
      )}

      <div className="nav-buttons">
        <div />
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Continue →
        </button>
      </div>
    </div>
  )
}

import type { FormFields } from './types'

function wordCount(text: string) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

interface Props {
  fields: Pick<FormFields, 'essay1' | 'essay2'>
  errors: Record<string, boolean>
  onChange: (name: keyof FormFields, value: string) => void
  onBack: () => void
  onNext: () => void
}

export default function StepEssays({ fields, errors, onChange, onBack, onNext }: Props) {
  const wc1 = wordCount(fields.essay1)
  const wc2 = wordCount(fields.essay2)

  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Written Questions</h2>
        <p>Please answer both questions thoughtfully. Each response should be 200–250 words.</p>
      </div>

      <div className="inset">
        <strong>Guidelines:</strong> Write in your own words. Responses should be between 200 and
        250 words each. Aim for clarity, authenticity, and specificity over formality.
      </div>

      <div className="field">
        <label htmlFor="essay1">
          Question 1 <span className="req">✦</span>
          <span className="hint">— 200–250 words</span>
        </label>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: 1.55 }}>
          Describe what you think it means to be a leader and what it takes to develop leadership qualities.
        </p>
        <textarea
          id="essay1"
          value={fields.essay1}
          onChange={e => onChange('essay1', e.target.value)}
          className={`essay${errors.essay1 ? ' invalid' : ''}`}
          placeholder="Your response here..."
        />
        <div className={`word-count${wc1 > 250 ? ' warn' : wc1 >= 200 ? ' ok' : ''}`}>
          {wc1} / 250 words
        </div>
        {errors.essay1 && <span className="field-error">Please write between 200 and 250 words.</span>}
      </div>

      <hr className="divider" />

      <div className="field">
        <label htmlFor="essay2">
          Question 2 <span className="req">✦</span>
          <span className="hint">— 200–250 words</span>
        </label>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: 1.55 }}>
          What does being Eritrean mean to you and how will you use the skills you develop in school
          to contribute to your community?
        </p>
        <textarea
          id="essay2"
          value={fields.essay2}
          onChange={e => onChange('essay2', e.target.value)}
          className={`essay${errors.essay2 ? ' invalid' : ''}`}
          placeholder="Your response here..."
        />
        <div className={`word-count${wc2 > 250 ? ' warn' : wc2 >= 200 ? ' ok' : ''}`}>
          {wc2} / 250 words
        </div>
        {errors.essay2 && <span className="field-error">Please write between 200 and 250 words.</span>}
      </div>

      <div className="nav-buttons">
        <button type="button" className="btn btn-outline" onClick={onBack}>← Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

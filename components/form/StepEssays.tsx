import { useRef, useState } from 'react'
import type { UploadedFiles } from './types'

interface Props {
  files: UploadedFiles
  errors: Record<string, boolean>
  onFile: (name: keyof UploadedFiles, file: File) => void
  onBack: () => void
  onNext: () => void
}

interface UploadAreaProps {
  name: keyof UploadedFiles
  label: string
  prompt: string
  file: File | undefined
  error: boolean
  onFile: (name: keyof UploadedFiles, file: File) => void
}

function UploadArea({ name, label, prompt, file, error, onFile }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFile(f: File) {
    if (f.type !== 'application/pdf') return
    if (f.size > 10 * 1024 * 1024) return
    onFile(name, f)
  }

  return (
    <div className="field" style={{ marginBottom: '1.75rem' }}>
      <label>{label} <span className="req">✦</span></label>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.55 }}>
        {prompt}
      </p>
      <div
        className={`file-upload-area${dragOver ? ' dragover' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault()
          setDragOver(false)
          const f = e.dataTransfer.files[0]
          if (f) handleFile(f)
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={e => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />
        <div className="file-upload-icon">📝</div>
        <p><strong>Click to upload</strong> or drag and drop</p>
        <p>PDF only · Max 10 MB</p>
        {file && <div className="file-name">✓ {file.name}</div>}
      </div>
      {error && <span className="field-error">Please upload your essay as a PDF.</span>}
    </div>
  )
}

export default function StepEssays({ files, errors, onFile, onBack, onNext }: Props) {
  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Essay Question</h2>
        <p>Write your response separately and upload it as a PDF. Max 10 MB.</p>
      </div>

      <UploadArea
        name="essay2"
        label="Community Essay"
        prompt="What does being Eritrean mean to you and how will you use the skills you develop in school to contribute to your community?"
        file={files.essay2}
        error={!!errors.essay2}
        onFile={onFile}
      />

      <div className="nav-buttons">
        <button type="button" className="btn btn-outline" onClick={onBack}>← Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

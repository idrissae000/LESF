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
  icon: string
  hint: string
  file: File | undefined
  error: boolean
  onFile: (name: keyof UploadedFiles, file: File) => void
}

function UploadArea({ name, label, icon, hint, file, error, onFile }: UploadAreaProps) {
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
        <div className="file-upload-icon">{icon}</div>
        <p><strong>Click to upload</strong> or drag and drop</p>
        <p>{hint}</p>
        {file && <div className="file-name">✓ {file.name}</div>}
      </div>
      {error && <span className="field-error">Please upload your {label.toLowerCase()}.</span>}
    </div>
  )
}

export default function StepUploads({ files, errors, onFile, onBack, onNext }: Props) {
  return (
    <div className="form-section">
      <div className="section-head">
        <h2>Required Documents</h2>
        <p>Upload your documents as PDF files. Max 10 MB per file.</p>
      </div>

      <UploadArea
        name="transcript"
        label="Official Transcript"
        icon="📄"
        hint="PDF only · Max 10 MB"
        file={files.transcript}
        error={!!errors.transcript}
        onFile={onFile}
      />

      <UploadArea
        name="resume"
        label="Resume"
        icon="📋"
        hint="PDF only · Max 10 MB"
        file={files.resume}
        error={!!errors.resume}
        onFile={onFile}
      />

      <UploadArea
        name="writingSample"
        label="Writing Sample"
        icon="✍️"
        hint="A paper, essay, or writing you're proud of · PDF only · Max 10 MB"
        file={files.writingSample}
        error={!!errors.writingSample}
        onFile={onFile}
      />

      <div className="nav-buttons">
        <button type="button" className="btn btn-outline" onClick={onBack}>← Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

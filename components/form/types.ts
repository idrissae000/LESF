export interface FormFields {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  eligibility: boolean
  schoolName: string
  gradeLevel: string
  major: string
  gpa: string
  graduationYear: string
  essay1: string
  essay2: string
  extracurriculars: string
  volunteerWork: string
  ref1Name: string
  ref1Title: string
  ref1Email: string
  ref1Phone: string
  ref2Name: string
  ref2Title: string
  ref2Email: string
  ref2Phone: string
  householdParents: string
  siblings: string
  currentlyWorks: string
  parentOccupations: string
  certify: boolean
}

export interface UploadedFiles {
  transcript?: File
  resume?: File
  writingSample?: File
}

export const INIT_FIELDS: FormFields = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
  eligibility: false,
  schoolName: '', gradeLevel: '', major: '', gpa: '', graduationYear: '',
  essay1: '', essay2: '',
  extracurriculars: '', volunteerWork: '',
  ref1Name: '', ref1Title: '', ref1Email: '', ref1Phone: '',
  ref2Name: '', ref2Title: '', ref2Email: '', ref2Phone: '',
  householdParents: '', siblings: '', currentlyWorks: '', parentOccupations: '',
  certify: false,
}

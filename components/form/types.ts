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
  extracurriculars: string
  householdParents: string
  siblings: string
  currentlyWorks: string
  parentOccupations: string
  certify: boolean
  attendEvent: boolean
}

export interface UploadedFiles {
  essay2?: File
  transcript?: File
  resume?: File
  writingSample?: File
}

export const INIT_FIELDS: FormFields = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
  eligibility: false,
  schoolName: '', gradeLevel: '', major: '', gpa: '', graduationYear: '',
  extracurriculars: '',
  householdParents: '', siblings: '', currentlyWorks: '', parentOccupations: '',
  certify: false,
  attendEvent: false,
}

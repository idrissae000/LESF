import { z } from 'zod'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
  'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
  'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
] as const

const str   = (max: number) => z.string().min(1).max(max).transform(s => s.replace(/<[^>]*>/g, '').trim())
const optStr = (max: number) => z.string().max(max).transform(s => s.replace(/<[^>]*>/g, '').trim()).optional().default('')
const email  = z.string().email().max(254).transform(s => s.toLowerCase().trim())
const phone  = z.string().regex(/^[\d\s\-().+]{7,20}$/, 'Invalid phone number')

export const applySchema = z.object({
  firstName:        str(100),
  lastName:         str(100),
  email,
  phone,
  address:          str(200),
  city:             str(100),
  state:            z.enum(US_STATES),
  zip:              z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP'),
  eligibility:      z.enum(['true', 'false']),
  schoolName:       str(200),
  gradeLevel:       z.enum(['Freshman', 'Sophomore', 'Junior', 'Senior']),
  major:            str(150),
  gpa:              z.string().regex(/^[0-3]\.\d{1,2}$|^4(\.0{1,2})?$/, 'Invalid GPA'),
  graduationYear:   z.string().regex(/^20\d{2}$/, 'Invalid year'),
  essay1:           z.string().min(50).max(5000).transform(s => s.replace(/<[^>]*>/g, '').trim()),
  essay2:           z.string().min(50).max(5000).transform(s => s.replace(/<[^>]*>/g, '').trim()),
  attendEvent:      z.enum(['Yes', 'No', 'Unsure']),
  extracurriculars: optStr(2000),
  volunteerWork:    optStr(2000),
  ref1Name:         optStr(100),
  ref1Title:        optStr(100),
  ref1Email:        z.string().max(254).transform(s => s.trim()).optional().default(''),
  ref1Phone:        optStr(20),
  ref2Name:         optStr(100),
  ref2Title:        optStr(100),
  ref2Email:        z.string().max(254).transform(s => s.trim()).optional().default(''),
  ref2Phone:        optStr(20),
  householdParents: optStr(50),
  siblings:         optStr(10),
  currentlyWorks:   optStr(50),
  parentOccupations: optStr(500),
  certify:          z.enum(['true', 'false']),
  // honeypot
  website:          z.string().max(0, 'Bot detected').optional().default(''),
})

export const mentorshipSchema = z.object({
  firstName:     str(100),
  lastName:      str(100),
  city:          str(100),
  state:         z.enum(US_STATES),
  profession:    str(150),
  employer:      str(200),
  degree:        str(200),
  university:    str(200),
  contactMethod: z.enum(['Email', 'Phone', 'LinkedIn']),
  email,
  phone,
  linkedin:      z.string().url().max(300).optional().or(z.literal('')).default(''),
  // honeypot
  website:       z.string().max(0, 'Bot detected').optional().default(''),
})

const SPONSOR_TIERS = [
  'Bronze', 'Silver', 'Gold', 'Platinum', 'Title Sponsor', 'Custom / In-Kind',
] as const

export const sponsorSchema = z.object({
  businessName:  str(200),
  contactName:   str(100),
  email,
  phone:         z.string().regex(/^[\d\s\-().+]{7,20}$/).optional().or(z.literal('')).default(''),
  tier:          z.enum(SPONSOR_TIERS),
  message:       optStr(3000),
  // honeypot
  website:       z.string().max(0, 'Bot detected').optional().default(''),
})

export const contactSchema = z.object({
  name:    str(100),
  email,
  subject: str(150),
  message: z.string().min(1).max(3000).transform(s => s.replace(/<[^>]*>/g, '').trim()),
  // honeypot
  website: z.string().max(0, 'Bot detected').optional().default(''),
})

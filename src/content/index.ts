import companyJson from './company.json'
import contactJson from './contact.json'
import productsJson from './products.json'

export type Language = 'en' | 'ar'
export type BilingualText = { en: string; ar: string }

export type ProductFamily = 'lg' | 'top' | 'gold' | 'exo' | 'putty' | 'glue'
export type ProductForm = 'bucket' | 'sack'
export type ProductUse = 'interior' | 'exterior' | 'both'
export type BucketSize = '2.5L' | '3kg' | '9L' | '13kg'

export type Product = {
  slug: string
  name: BilingualText
  family: ProductFamily
  form: ProductForm
  code: string
  use: ProductUse
  finish: BilingualText
  label: string | null
  sizes: BucketSize[]
  viewScale: number
  room: number
  specs: {
    coverage: BilingualText
    thinning: BilingualText
    dryTime: BilingualText
    recoat: BilingualText
    shelfLife: BilingualText
  }
  description: BilingualText
  features: BilingualText[]
}

export type Claim = { value: string; label: BilingualText }
export type UseCase = { key: string; title: BilingualText; body: BilingualText }

export type Company = {
  name: BilingualText
  legalName: BilingualText
  tagline: BilingualText
  heroHeadline: BilingualText
  heroSubline: BilingualText
  intro: BilingualText
  story: BilingualText
  claims: Claim[]
  useCases: UseCase[]
}

export type Contact = {
  headline: BilingualText
  body: BilingualText
  phone: string
  whatsapp: string
  email: string
  address: BilingualText
  hours: BilingualText
}

export const company = companyJson as Company
export const contact = contactJson as Contact
export const products = productsJson as Product[]

export const productBySlug = (slug: string) => products.find((product) => product.slug === slug)
export const readText = (text: BilingualText, language: Language) => text[language].trim()

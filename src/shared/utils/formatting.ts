import type { ProductFamily, ProductUse } from '../../content'

export const familyHex: Record<ProductFamily, string> = {
  lg: '#c8102e',
  top: '#7b2f8f',
  gold: '#6d1230',
  exo: '#8e44ad',
  putty: '#1f4fa3',
  glue: '#5c4a8a'
}

export const familyAccent = (family: ProductFamily) => `var(--family-${family})`

export const familyLabel: Record<ProductFamily, { en: string; ar: string }> = {
  lg: { en: 'LG', ar: 'ال جى' },
  top: { en: 'Top', ar: 'توب' },
  gold: { en: 'Gold', ar: 'جولد' },
  exo: { en: 'Exo', ar: 'اكسو' },
  putty: { en: 'Putty', ar: 'معجون' },
  glue: { en: 'Glue', ar: 'غراء' }
}

export const useLabel: Record<ProductUse, { en: string; ar: string }> = {
  interior: { en: 'Interior', ar: 'داخلى' },
  exterior: { en: 'Exterior', ar: 'خارجى' },
  both: { en: 'Interior & exterior', ar: 'داخلى وخارجى' }
}

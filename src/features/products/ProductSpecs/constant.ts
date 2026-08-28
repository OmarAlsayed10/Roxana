import type { Product } from '../../../content'

export const specRows: { key: keyof Product['specs']; label: { en: string; ar: string } }[] = [
  { key: 'coverage', label: { en: 'Coverage', ar: 'التغطية' } },
  { key: 'thinning', label: { en: 'Thinning', ar: 'التخفيف' } },
  { key: 'dryTime', label: { en: 'Dry time', ar: 'زمن الجفاف' } },
  { key: 'recoat', label: { en: 'Recoat', ar: 'إعادة الطلاء' } },
  { key: 'shelfLife', label: { en: 'Shelf life', ar: 'مدة الصلاحية' } }
]

export const specsTitle = { en: 'Technical data', ar: 'البيانات الفنية' }
export const featuresTitle = { en: 'Features', ar: 'المميزات' }

export const formFields = [
  { name: 'name', type: 'text', label: { en: 'Name', ar: 'الاسم' }, required: true },
  { name: 'phone', type: 'tel', label: { en: 'Phone', ar: 'التليفون' }, required: true },
  { name: 'message', type: 'textarea', label: { en: 'Message', ar: 'الرسالة' }, required: true }
] as const

export const formCopy = {
  submit: { en: 'Send enquiry', ar: 'ابعت الاستفسار' },
  sending: { en: 'Sending…', ar: 'جارى الإرسال…' },
  sent: { en: 'Sent. We will get back to you.', ar: 'تم الإرسال. هنرجعلك قريب.' },
  notConfigured: {
    en: 'Thanks — we will be in touch.',
    ar: 'شكراً — هنتواصل معاك قريب.'
  },
  failed: { en: 'Something went wrong. Try again.', ar: 'حصل خطأ. حاول تانى.' }
}

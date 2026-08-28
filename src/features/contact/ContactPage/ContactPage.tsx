import { contact } from '../../../content'
import type { SiteControls } from '../../../shared/types'
import { DisplayHeading, PageShell, SectionLabel } from '../../../UI'
import { ContactForm } from '../ContactForm'
import { ContactPageTokens } from './tokens'

const contactLabel = { en: 'Contact', ar: 'تواصل' }
const detailsLabel = { en: 'Details', ar: 'بيانات التواصل' }
const pendingLabel = { en: 'To be added', ar: 'هيتم إضافته' }

export const ContactPage = ({ language }: SiteControls) => {
  const rows = [
    { label: { en: 'Phone', ar: 'التليفون' }, value: contact.phone },
    { label: { en: 'WhatsApp', ar: 'واتساب' }, value: contact.whatsapp },
    { label: { en: 'Email', ar: 'الإيميل' }, value: contact.email },
    { label: { en: 'Address', ar: 'العنوان' }, value: contact.address[language] },
    { label: { en: 'Hours', ar: 'مواعيد العمل' }, value: contact.hours[language] }
  ]

  return (
    <PageShell>
      <div {...ContactPageTokens.head}>
        <SectionLabel>{contactLabel[language]}</SectionLabel>
        <DisplayHeading level={1}>{contact.headline[language]}</DisplayHeading>
        <p {...ContactPageTokens.body}>{contact.body[language]}</p>
      </div>
      <div {...ContactPageTokens.grid}>
        <ContactForm language={language} />
        <aside {...ContactPageTokens.aside}>
          <SectionLabel>{detailsLabel[language]}</SectionLabel>
          {rows.map((row) => (
            <div key={row.label.en} {...ContactPageTokens.row}>
              <p {...ContactPageTokens.rowLabel}>{row.label[language]}</p>
              {row.value ? (
                <p {...ContactPageTokens.rowValue}>{row.value}</p>
              ) : (
                <p {...ContactPageTokens.rowEmpty}>{pendingLabel[language]}</p>
              )}
            </div>
          ))}
        </aside>
      </div>
    </PageShell>
  )
}

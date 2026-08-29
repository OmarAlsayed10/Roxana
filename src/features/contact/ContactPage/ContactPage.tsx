import { contact } from '../../../content'
import type { SiteControls } from '../../../shared/types'
import { DisplayHeading, PageShell, SectionLabel } from '../../../UI'
import { ContactForm } from '../ContactForm'
import { contactLabel, detailsLabel, pendingLabel, rowLabels } from './constant'
import { ContactPageTokens } from './tokens'

export const ContactPage = ({ language }: SiteControls) => {
  const rows = [
    { label: rowLabels.phone, values: contact.phones },
    { label: rowLabels.whatsapp, values: contact.whatsapp },
    { label: rowLabels.email, values: [contact.email] },
    { label: rowLabels.address, values: [contact.address[language]] },
    { label: rowLabels.hours, values: [contact.hours[language]] }
  ].map((row) => ({ ...row, values: row.values.filter(Boolean) }))

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
              {row.values.length ? (
                row.values.map((value) => (
                  <p key={value} {...ContactPageTokens.rowValue}>
                    {value}
                  </p>
                ))
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

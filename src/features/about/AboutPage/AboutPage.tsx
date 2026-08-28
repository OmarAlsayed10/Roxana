import { company } from '../../../content'
import type { SiteControls } from '../../../shared/types'
import { DisplayHeading, PageShell, SectionLabel } from '../../../UI'
import { AboutPageTokens } from './tokens'

const aboutLabel = { en: 'About', ar: 'عن روكسانا' }
const claimsLabel = { en: 'At a glance', ar: 'نظرة سريعة' }

export const AboutPage = ({ language }: SiteControls) => (
  <PageShell>
    <div {...AboutPageTokens.head}>
      <SectionLabel>{aboutLabel[language]}</SectionLabel>
      <DisplayHeading level={1}>{company.legalName[language]}</DisplayHeading>
      <p {...AboutPageTokens.intro}>{company.intro[language]}</p>
    </div>
    <div {...AboutPageTokens.body}>
      <p {...AboutPageTokens.story}>{company.story[language]}</p>
      <aside {...AboutPageTokens.aside}>
        <SectionLabel>{claimsLabel[language]}</SectionLabel>
        {company.claims.map((claim, index) => (
          <div key={index} {...AboutPageTokens.asideRow}>
            <p {...AboutPageTokens.asideLabel}>{claim.label[language]}</p>
            <p {...AboutPageTokens.asideValue}>{claim.value}</p>
          </div>
        ))}
      </aside>
    </div>
  </PageShell>
)

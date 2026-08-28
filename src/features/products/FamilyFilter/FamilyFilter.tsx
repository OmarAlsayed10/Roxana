import type { Language, ProductFamily } from '../../../content'
import { familyLabel } from '../../../shared/utils'
import { allFilterKey, allFilterLabel } from './constant'
import { FamilyFilterTokens } from './tokens'

type FamilyFilterProps = {
  families: ProductFamily[]
  active: ProductFamily | typeof allFilterKey
  setActive: (family: ProductFamily | typeof allFilterKey) => void
  language: Language
}

export const FamilyFilter = ({ families, active, setActive, language }: FamilyFilterProps) => {
  const chipClass = (key: string) =>
    `${FamilyFilterTokens.chip.className} ${active === key ? FamilyFilterTokens.chipActive.className : FamilyFilterTokens.chipIdle.className}`

  return (
    <div {...FamilyFilterTokens.root}>
      <button type="button" className={chipClass(allFilterKey)} onClick={() => setActive(allFilterKey)}>
        {allFilterLabel[language]}
      </button>
      {families.map((family) => (
        <button key={family} type="button" className={chipClass(family)} onClick={() => setActive(family)}>
          {familyLabel[family][language]}
        </button>
      ))}
    </div>
  )
}

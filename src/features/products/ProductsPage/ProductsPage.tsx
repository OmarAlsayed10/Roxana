import { useState } from 'react'
import { products, type ProductFamily } from '../../../content'
import type { SiteControls } from '../../../shared/types'
import { DisplayHeading, PageShell, SectionLabel } from '../../../UI'
import { allFilterKey, FamilyFilter } from '../FamilyFilter'
import { ProductCard } from '../ProductCard'
import { productsCopy } from './constant'
import { ProductsPageTokens } from './tokens'

export const ProductsPage = ({ language }: SiteControls) => {
  const [active, setActive] = useState<ProductFamily | typeof allFilterKey>(allFilterKey)
  const families = [...new Set(products.map((product) => product.family))]
  const visible = active === allFilterKey ? products : products.filter((product) => product.family === active)

  return (
    <PageShell>
      <div {...ProductsPageTokens.head}>
        <SectionLabel>{productsCopy.label[language]}</SectionLabel>
        <DisplayHeading level={1}>{productsCopy.title[language]}</DisplayHeading>
        <p {...ProductsPageTokens.intro}>{productsCopy.intro[language]}</p>
      </div>
      <FamilyFilter families={families} active={active} setActive={setActive} language={language} />
      {visible.length === 0 ? (
        <p {...ProductsPageTokens.empty}>{productsCopy.empty[language]}</p>
      ) : (
        <div {...ProductsPageTokens.grid}>
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} language={language} />
          ))}
        </div>
      )}
    </PageShell>
  )
}

import type { Language, Product } from '../../../content'
import { DisplayHeading } from '../../../UI'
import { featuresTitle, specRows, specsTitle } from './constant'
import { ProductSpecsTokens } from './tokens'

type ProductSpecsProps = {
  product: Product
  language: Language
}

export const ProductSpecs = ({ product, language }: ProductSpecsProps) => (
  <div {...ProductSpecsTokens.root}>
    <section {...ProductSpecsTokens.block}>
      <DisplayHeading level={3} className={ProductSpecsTokens.heading.className}>
        {specsTitle[language]}
      </DisplayHeading>
      {specRows.map((row) => (
        <div key={row.key} {...ProductSpecsTokens.row}>
          <span {...ProductSpecsTokens.rowLabel}>{row.label[language]}</span>
          <span {...ProductSpecsTokens.rowValue}>{product.specs[row.key][language]}</span>
        </div>
      ))}
    </section>
    <section {...ProductSpecsTokens.block}>
      <DisplayHeading level={3} className={ProductSpecsTokens.heading.className}>
        {featuresTitle[language]}
      </DisplayHeading>
      <ul {...ProductSpecsTokens.features}>
        {product.features.map((feature, index) => (
          <li key={index} {...ProductSpecsTokens.feature}>
            <span {...ProductSpecsTokens.bullet} />
            {feature[language]}
          </li>
        ))}
      </ul>
    </section>
  </div>
)

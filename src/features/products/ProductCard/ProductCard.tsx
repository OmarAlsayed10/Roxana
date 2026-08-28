import { Link } from 'react-router'
import { productPath } from '../../../app'
import type { Language, Product } from '../../../content'
import { familyHex, familyLabel, useLabel } from '../../../shared/utils'
import { Badge } from '../../../UI'
import { posterPath } from './constant'
import { ProductCardTokens } from './tokens'

type ProductCardProps = {
  product: Product
  language: Language
}

export const ProductCard = ({ product, language }: ProductCardProps) => (
  <Link to={productPath(product.slug)} {...ProductCardTokens.root}>
    <div {...ProductCardTokens.visual}>
      <img
        src={posterPath(product.slug)}
        alt={product.name[language]}
        loading="lazy"
        decoding="async"
        {...ProductCardTokens.image}
      />
    </div>
    <div {...ProductCardTokens.body}>
      <div {...ProductCardTokens.meta}>
        <Badge accent={familyHex[product.family]}>{familyLabel[product.family][language]}</Badge>
        <Badge>{useLabel[product.use][language]}</Badge>
      </div>
      <h3 {...ProductCardTokens.name}>{product.name[language]}</h3>
      <p {...ProductCardTokens.finish}>{product.finish[language]}</p>
      <p {...ProductCardTokens.sizes}>{product.sizes.join(' · ')}</p>
    </div>
  </Link>
)

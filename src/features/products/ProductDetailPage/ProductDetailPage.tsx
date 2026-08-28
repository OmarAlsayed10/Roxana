import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { siteRoutes } from '../../../app'
import { productBySlug } from '../../../content'
import type { SiteControls } from '../../../shared/types'
import { familyHex, familyLabel, useLabel } from '../../../shared/utils'
import { Badge, DisplayHeading, PageShell, SectionLabel } from '../../../UI'
import { ProductGallery } from '../ProductGallery'
import { ProductSpecs } from '../ProductSpecs'
import { ProductDetailPageTokens } from './tokens'

const backLabel = { en: 'All products', ar: 'كل المنتجات' }
const missingLabel = { en: 'Product not found.', ar: 'المنتج غير موجود.' }

export const ProductDetailPage = ({ language }: SiteControls) => {
  const { slug } = useParams()
  const product = slug ? productBySlug(slug) : undefined
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft

  if (!product) {
    return (
      <PageShell>
        <p {...ProductDetailPageTokens.missing}>{missingLabel[language]}</p>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Link to={siteRoutes.products} {...ProductDetailPageTokens.back}>
        <BackArrow size={16} />
        {backLabel[language]}
      </Link>
      <div {...ProductDetailPageTokens.head}>
        <div {...ProductDetailPageTokens.meta}>
          <Badge accent={familyHex[product.family]}>{familyLabel[product.family][language]}</Badge>
          <Badge>{useLabel[product.use][language]}</Badge>
          <Badge>{product.finish[language]}</Badge>
        </div>
        <SectionLabel>{product.code}</SectionLabel>
        <DisplayHeading level={1}>{product.name[language]}</DisplayHeading>
        <p {...ProductDetailPageTokens.description}>{product.description[language]}</p>
      </div>
      <ProductGallery product={product} language={language} />
      <ProductSpecs product={product} language={language} />
    </PageShell>
  )
}

import type { Language, Product } from '../../../content'
import { assetPath, familyHex, posterPath } from '../../../shared/utils'
import { BucketViewer, roomFiles } from '../../../viewer'
import { sizeLabel } from './constant'
import { ProductGalleryTokens } from './tokens'

type ProductGalleryProps = {
  product: Product
  language: Language
}

export const ProductGallery = ({ product, language }: ProductGalleryProps) => (
  <div {...ProductGalleryTokens.root}>
    <div {...ProductGalleryTokens.stage}>
      <BucketViewer
        form={product.form}
        profile={product.profile}
        accent={familyHex[product.family]}
        label={product.label ? assetPath(product.label) : null}
        labelOffset={product.labelOffset}
        poster={posterPath(product.slug)}
        posterAlt={product.name[language]}
        language={language}
        viewScale={product.viewScale}
        allowZoom
        rooms={[roomFiles[product.room] ?? roomFiles[0]]}
      />
    </div>
    <div {...ProductGalleryTokens.bar}>
      <span {...ProductGalleryTokens.barLabel}>{sizeLabel[language]}</span>
      <span {...ProductGalleryTokens.sizes}>{product.packs.join(' · ')}</span>
    </div>
  </div>
)

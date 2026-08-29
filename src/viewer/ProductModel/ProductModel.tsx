import type { ProductForm, ProfileKey } from '../../content'
import { PaintBucket } from '../PaintBucket'
import { PaintTin } from '../PaintTin'
import { PuttySack } from '../PuttySack'
import { SpinGroup } from './SpinGroup'

type ProductModelProps = {
  form: ProductForm
  profile: ProfileKey
  accent: string
  label: string | null
  labelOffset: number
  spinSpeed: number
}

export const ProductModel = ({ form, profile, accent, label, labelOffset, spinSpeed }: ProductModelProps) => {
  const solid = profile === 'sack' ? 'pail-jumbo' : profile

  return (
    <SpinGroup speed={spinSpeed}>
      {form === 'sack' ? (
        <PuttySack accent={accent} label={label} />
      ) : form === 'tin' ? (
        <PaintTin profile={solid} accent={accent} label={label} labelOffset={labelOffset} />
      ) : (
        <PaintBucket profile={solid} accent={accent} label={label} labelOffset={labelOffset} />
      )}
    </SpinGroup>
  )
}

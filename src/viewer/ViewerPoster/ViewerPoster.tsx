import { BucketMark } from '../../UI/BucketMark'
import { ViewerPosterTokens } from './tokens'

type ViewerPosterProps = {
  accent: string
  image?: string
  alt?: string
}

export const ViewerPoster = ({ accent, image, alt = '' }: ViewerPosterProps) => (
  <div {...ViewerPosterTokens.root}>
    {image ? (
      <img src={image} alt={alt} decoding="async" {...ViewerPosterTokens.image} />
    ) : (
      <>
        <div {...ViewerPosterTokens.grain} />
        <BucketMark accent={accent} className={ViewerPosterTokens.mark.className} />
      </>
    )}
  </div>
)

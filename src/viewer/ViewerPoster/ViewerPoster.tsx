import { BucketMark } from '../../UI/BucketMark'
import { ViewerPosterTokens } from './tokens'

type ViewerPosterProps = {
  accent: string
  hint?: string
  onActivate?: () => void
}

export const ViewerPoster = ({ accent, hint, onActivate }: ViewerPosterProps) => (
  <div {...ViewerPosterTokens.root} onClick={onActivate} role={onActivate ? 'button' : undefined}>
    <div {...ViewerPosterTokens.grain} />
    <BucketMark accent={accent} className={ViewerPosterTokens.mark.className} />
    {hint && <p {...ViewerPosterTokens.hint}>{hint}</p>}
  </div>
)

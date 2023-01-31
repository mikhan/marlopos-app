import { provideImageKitLoader } from '$core/services/imagekit-loader'
import { getLanguage } from '$lib/utils/language'
import { PUBLIC_IMAGE_CDN_PROVIDER, PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'
import type { LayoutLoad } from './$types'

export const trailingSlash = 'always'

if (PUBLIC_IMAGE_CDN_PROVIDER === 'imagekit') {
  provideImageKitLoader(PUBLIC_IMAGE_CDN_ENDPOINT)
}

export const load = (({ params }) => {
  const language = getLanguage(params.lang)

  return { language }
}) satisfies LayoutLoad

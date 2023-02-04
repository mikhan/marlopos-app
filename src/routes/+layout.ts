import { provideImageKitLoader } from '$core/services/imagekit-loader'
import { PUBLIC_IMAGE_CDN_PROVIDER, PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'

export const trailingSlash = 'always'

if (PUBLIC_IMAGE_CDN_PROVIDER === 'imagekit') {
  provideImageKitLoader(PUBLIC_IMAGE_CDN_ENDPOINT)
}

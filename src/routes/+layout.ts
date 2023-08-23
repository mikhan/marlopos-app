import { provideImageKitLoader } from '$core/services/imagekit-image-loader'
import { PUBLIC_IMAGE_CDN_PROVIDER, PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'

if (PUBLIC_IMAGE_CDN_PROVIDER === 'imagekit') {
  provideImageKitLoader(PUBLIC_IMAGE_CDN_ENDPOINT)
}

export const trailingSlash = 'always'

export const prerender = true

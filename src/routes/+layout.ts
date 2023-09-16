import { PUBLIC_IMAGE_CDN_ENDPOINT, PUBLIC_IMAGE_CDN_PROVIDER } from '$env/static/public'
import { provideImageKitLoader } from '$core/services/imagekit-image-loader'

if (PUBLIC_IMAGE_CDN_PROVIDER === 'imagekit') {
  provideImageKitLoader(PUBLIC_IMAGE_CDN_ENDPOINT)
}

export const trailingSlash = 'always'
export const prerender = true

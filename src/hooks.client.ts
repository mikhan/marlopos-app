import { PUBLIC_IMAGE_CDN_ENDPOINT, PUBLIC_IMAGE_CDN_PROVIDER } from '$env/static/public'
import { setResourceProvider } from '$core/services/resource-provider'
import { ImagekitResourceProvider } from '$lib/services/imagekit-resource-provider'

switch (PUBLIC_IMAGE_CDN_PROVIDER) {
  case 'imagekit':
    setResourceProvider(new ImagekitResourceProvider(PUBLIC_IMAGE_CDN_ENDPOINT))
    break
}

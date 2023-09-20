import type { HandleServerError } from '@sveltejs/kit'
import { PUBLIC_IMAGE_CDN_ENDPOINT, PUBLIC_IMAGE_CDN_PROVIDER } from '$env/static/public'
import { setResourceProvider } from '$core/services/resource-provider'
import { packagesIndexProvider } from '$lib/database/document-index-providers/packages'
import { handleLanguage } from '$lib/hooks/language.server'
import { ImagekitResourceProvider } from '$lib/services/imagekit-resource-provider'
import { addDocumentIndexProvider } from '$lib/services/search'

switch (PUBLIC_IMAGE_CDN_PROVIDER) {
  case 'imagekit':
    setResourceProvider(new ImagekitResourceProvider(PUBLIC_IMAGE_CDN_ENDPOINT))
    break

  default:
    throw new Error('No CDN resource provider configured')
}

addDocumentIndexProvider('packages', packagesIndexProvider)

export const handle = handleLanguage

export const handleError = (({ error }) => {
  console.error(error)

  return { message: 'Ha ocurrido un error' }
}) satisfies HandleServerError

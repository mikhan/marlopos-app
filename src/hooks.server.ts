import type { HandleServerError } from '@sveltejs/kit'
import { PUBLIC_IMAGE_CDN_ENDPOINT, PUBLIC_IMAGE_CDN_PROVIDER } from '$env/static/public'
import { setResourceProvider } from '$core/services/resource-provider'
import { destinationsIndexProvider } from '$lib/database/document-index-providers/destinations'
import { packagesIndexProvider } from '$lib/database/document-index-providers/packages'
import { handleLanguage } from '$lib/hooks/language.server'
import { ImagekitResourceProvider } from '$lib/services/imagekit-resource-provider'
import { addDocumentIndexProvider } from '$lib/services/search'

switch (PUBLIC_IMAGE_CDN_PROVIDER) {
  case 'imagekit':
    setResourceProvider(new ImagekitResourceProvider(PUBLIC_IMAGE_CDN_ENDPOINT))
    break
}

addDocumentIndexProvider('package', packagesIndexProvider)
addDocumentIndexProvider('destination', destinationsIndexProvider)

export const handle = handleLanguage

export const handleError = (({ error }) => {
  const message = error instanceof Object && 'message' in error ? `Error: ${error.message}` : error
  console.error(message)

  return { message: 'Ha ocurrido un error' }
}) satisfies HandleServerError

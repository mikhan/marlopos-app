import { redirect, type Handle } from '@sveltejs/kit'
import { getRequestLanguage } from '$lib/core/utils/language'

export const handle = (({ event, resolve }) => {
  if (event.request.url.includes('/assets/')) {
    return resolve(event)
  }

  try {
    event.locals.language = getRequestLanguage(event.request)
  } catch (error) {
    if (error instanceof URL) {
      throw redirect(302, error.toString())
    }
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.language),
  })
}) satisfies Handle

import { handleLanguage } from '$lib/hooks/language.server'
import type { HandleServerError } from '@sveltejs/kit'

export const handle = handleLanguage

export const handleError = (({ error }) => {
  console.error(error)

  return { message: 'Ha ocurrido un error' }
}) satisfies HandleServerError

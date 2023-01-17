import { SUPPORTED_LANGUAGES } from '$lib/app/constants'
import type { ParamMatcher } from '@sveltejs/kit'

export const match = ((param) => {
  return SUPPORTED_LANGUAGES.includes(param)
}) satisfies ParamMatcher

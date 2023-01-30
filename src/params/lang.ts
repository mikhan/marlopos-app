import { isSupportedLanguage } from '$lib/utils/language'
import type { ParamMatcher } from '@sveltejs/kit'

export const match = ((param) => {
  return isSupportedLanguage(param)
}) satisfies ParamMatcher

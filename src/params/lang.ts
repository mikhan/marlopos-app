import type { ParamMatcher } from '@sveltejs/kit'
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '$lib/utils/language'

export const match = ((param) => {
  return isSupportedLanguage(param || DEFAULT_LANGUAGE.code)
}) satisfies ParamMatcher

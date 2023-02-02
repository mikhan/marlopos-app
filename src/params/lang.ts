import { DEFAULT_LANGUAGE, isSupportedLanguage } from '$lib/utils/language'
import type { ParamMatcher } from '@sveltejs/kit'

export const match = ((param) => {
  return isSupportedLanguage(param || DEFAULT_LANGUAGE.code)
}) satisfies ParamMatcher

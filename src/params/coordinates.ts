import type { ParamMatcher } from '@sveltejs/kit'

export const match = ((param) => {
  const [lon, lat] = param.split(',').map((s) => Number.parseFloat(s))

  return Number.isFinite(lon) && Number.isFinite(lat)
}) satisfies ParamMatcher

import { assertIsNonNullable, assertIsObject } from '$core/utils/assert'
import { fromCollection } from '$lib/directus/api'
import { getLanguage, type Language } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export interface FeaturedPackage {
  slug: string
  name: string
  description: string
  cover: {
    id: string
    url: string
    blurhash: string
  }
}

export async function getFeaturedPackages({ language }: { language: Language }): Promise<FeaturedPackage[]> {
  const items = await fromCollection('package_translations', {
    fields: ['slug', 'name', 'description', 'package_id.cover.id', 'package_id.cover.blurhash'],
    filter: {
      languages_code: { code: { _eq: language.locale } },
      package_id: {
        status: { _eq: 'published' },
        favorite: { _eq: true },
      },
    },
  })

  return items.transform((item) => {
    assertIsObject(item.package_id)
    assertIsObject(item.package_id.cover)
    assertIsNonNullable(item.package_id.cover.blurhash)

    return {
      slug: item.slug,
      name: item.name,
      description: item.description,
      cover: {
        id: item.package_id.cover.id,
        url: `/assets/${item.package_id.cover.id}?key=cover`,
        blurhash: item.package_id.cover.blurhash,
      },
    }
  })
}

export const load = (async ({ params }) => {
  const language = getLanguage(params.lang)
  const featuredPackages = await getFeaturedPackages({ language })

  return { featuredPackages }
}) satisfies PageServerLoad

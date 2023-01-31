// import { assertIsNonNullable, assertIsObject } from '$core/utils/assert'
// import { fromCollection } from '$lib/directus/api'
import { supabase, type SupabaseResponse } from '$lib/services/supabase'
import { getLanguage, type Language } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export interface FeaturedPackage {
  slug: string
  name: string
  description: string
  cover: {
    id: string
    title: string
    blurhash: string
  }
}

async function getFeaturedPackages({ language }: { language: Language }): Promise<FeaturedPackage[]> {
  type QueryResponse = SupabaseResponse<
    {
      slug: string
      name: string
      description: string
      package: {
        cover: {
          id: string
          title: string
          blurhash: string
        }
      }
    }[]
  >

  const { data, error } = (await supabase
    .from('package_translations')
    .select(`slug, name, description, package( cover( id, title, blurhash ) )`)
    .eq('languages_code', language.locale)
    .eq('package.status', 'published')
    .eq('package.favorite', true)) as QueryResponse

  if (error) throw error

  return data.map(({ package: { cover }, ...item }) => ({ ...item, cover }))
}

// async function getFeaturedPackages({ language }: { language: Language }): Promise<FeaturedPackage[]> {
//   const items = await fromCollection('package_translations', {
//     fields: ['slug', 'name', 'description', 'package_id.cover.id', 'package_id.cover.blurhash'],
//     filter: {
//       languages_code: { _eq: language.locale },
//       package_id: {
//         status: { _eq: 'published' },
//         favorite: { _eq: true },
//       },
//     },
//   })

//   console.log('getFeaturedPackages', new Date().getTime() - time.getTime())

//   return items.transform((item) => {
//     assertIsObject(item.package_id)
//     assertIsObject(item.package_id.cover)
//     assertIsNonNullable(item.package_id.cover.blurhash)

//     return {
//       slug: item.slug,
//       name: item.name,
//       description: item.description,
//       cover: {
//         id: item.package_id.cover.id,
//         url: `/assets/${item.package_id.cover.id}?key=cover`,
//         blurhash: item.package_id.cover.blurhash,
//       },
//     }
//   })
// }

const cache: { [K in string]: Promise<FeaturedPackage[]> } = {}
export const load = (async ({ params }) => {
  const language = getLanguage(params.lang)
  let featuredPackages = cache[language.code]

  if (!featuredPackages) {
    featuredPackages = getFeaturedPackages({ language })
    cache[language.code] = featuredPackages
  }

  return { featuredPackages }
}) satisfies PageServerLoad

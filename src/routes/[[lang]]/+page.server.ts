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
  type Data = {
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
  }

  const { data, error } = (await supabase
    .from('package_translations')
    .select(`slug, name, description, package( cover( id, title, blurhash ) )`)
    .eq('languages_code', language.locale)
    .eq('package.status', 'published')
    .eq('package.favorite', true)) as SupabaseResponse<Data[]>

  if (error) throw error

  return data.map(({ package: { cover }, ...rest }) => ({ ...rest, cover }))
}

export const load = (async ({ params }) => {
  const language = getLanguage(params.lang)
  const featuredPackages = getFeaturedPackages({ language })

  return { featuredPackages }
}) satisfies PageServerLoad

import { error } from '@sveltejs/kit'
import { supabase, type SupabaseResponse } from '$lib/services/supabase'
import { getLanguage, type Language } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export interface Package {
  slug: string
  name: string
  description: string
  cover: {
    id: string
    title: string
    blurhash: string
  }
}

async function getPackage({ id, language }: { id: string; language: Language }): Promise<Package | null> {
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
    .eq('package.id', id)) as SupabaseResponse<Data[]>

  if (error) throw error

  const [item] = data

  if (!item) return null

  const {
    package: { cover },
    ...rest
  } = item

  return { ...rest, cover }
}

export const load = (async ({ params }) => {
  const language = getLanguage(params.lang)
  const id = params.id
  const content = await getPackage({ id, language })

  if (!content) {
    throw error(404, { message: 'Not found' })
  }

  return { content }
}) satisfies PageServerLoad

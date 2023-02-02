import { api, type ApiResponse } from '../services/api'
import type { Language } from '../utils/language'

export async function getPackages({
  language,
  slug,
  featured,
}: {
  language: Language
  slug?: string
  featured?: boolean
}): Promise<Database.Package[]> {
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

  let request = api
    .from('package_translations')
    .select(`slug, name, description, package( cover( id, title, blurhash ) )`)
    .eq('languages_code', language.locale)

  if (slug) {
    request = request.eq('slug', slug)
  } else {
    request = request.eq('package.status', 'published')

    if (featured) request = request.eq('package.favorite', true)
  }

  const { data, error } = (await request) as ApiResponse<Data[]>

  if (error) throw error

  return data.map(({ package: { cover }, ...rest }) => ({ ...rest, cover }))
}

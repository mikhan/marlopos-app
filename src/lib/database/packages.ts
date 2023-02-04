import type { PostgrestResponse } from '@supabase/supabase-js'
import { api } from '../services/api'
import type { Language } from '../utils/language'

export type GetPackagesOptions = { language: Language } & ({ id: string } | { featured: boolean })

export async function getPackages(options: GetPackagesOptions): Promise<Database.Package[]> {
  type Data = {
    id: string
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
    .select(`id, name, description, package( cover!inner( id, title, blurhash ) )`)
    .throwOnError()

  if ('id' in options) {
    request = request.eq('id', options.id)
  } else {
    request = request.eq('languages_code', options.language.locale).eq('package.status', 'published')

    if (options.featured) request = request.eq('package.favorite', true)
  }

  const { data, error } = (await request) as PostgrestResponse<Data>

  if (error) throw error

  data

  return data.map(({ package: { cover }, ...rest }) => ({ ...rest, cover }))
}

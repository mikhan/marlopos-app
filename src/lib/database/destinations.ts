import type { PostgrestResponse } from '@supabase/supabase-js'
import { api, type ApiResponse } from '../services/api'
import type { Language } from '../utils/language'

export async function getDestinations({
  language,
  id,
}: {
  language: Language
  id?: string
}): Promise<Database.Package[]> {
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

  let request = api.from('destination_translations').select(`
      id,
      name,
      destination (
        cover (
          id,
          title,
          blurhash
        ),
        coordinates,
        country (
          name
        )
      )`)

  if (id) {
    request = request.eq('id', id)
  } else {
    request = request.eq('languages_code', language.locale)
  }

  const { data, error } = (await request) as PostgrestResponse<Data>

  if (error) throw error

  return data.map(({ package: { cover }, ...rest }) => ({ ...rest, cover }))
}

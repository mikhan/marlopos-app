import { api } from '../services/api'
import type { Language } from '../utils/language'

export async function getDestinations({ language, id }: { language: Language; id?: string }) {
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

  const { data, error } = await request.returns<
    {
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
    }[]
  >()

  if (error) throw error

  return data.map(({ package: { cover }, ...rest }) => ({ ...rest, cover }))
}

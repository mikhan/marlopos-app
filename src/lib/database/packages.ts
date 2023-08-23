import { api } from '../services/api'
import type { Language } from '../utils/language'

export async function getPackages(options: { language: Language; featured: boolean }) {
  let request = api
    .from('package_translations')
    .select(`id, name, description, package( cover!inner( id:filename_disk, title, width, height, blurhash ) )`)
    .eq('languages_code', options.language.locale)
    .eq('package.status', 'published')

  if (options.featured) request = request.eq('package.favorite', true)

  const { data, error } = await request.throwOnError().returns<
    {
      id: string
      name: string
      description: string
      package: {
        cover: Database.Image
      }
    }[]
  >()

  if (error) throw error

  return data.map(({ package: { cover }, ...rest }) => ({ ...rest, cover }))
}

export async function getPackage(options: { language: Language; id: string }) {
  const { data, error } = await api
    .from('package_translations')
    .select(
      `
      id,
      name,
      description,
      content,
      package (
        cover (
          id:filename_disk,
          title,
          width,
          height,
          blurhash
        ),
        package_destination!inner (
          days,
          nights,
          destination!inner (
            coordinates->coordinates,
            cover (
              id:filename_disk,
              title,
              width,
              height,
              blurhash
            ),
            destination_translations!inner (
              name,
              description
            )
          )
        )
      )`,
    )
    .eq('id', options.id)
    .eq('package.package_destination.destination.destination_translations.languages_code', options.language.locale)
    .throwOnError()
    .returns<
      {
        id: string
        name: string
        description: string
        content: string
        package: {
          cover: Database.Image
          package_destination: {
            days: number
            nights: number
            destination: {
              coordinates: [number, number]
              cover: Database.Image
              destination_translations: {
                name: string
                description: string
              }[]
            }
          }[]
        }
      }[]
    >()

  if (error) throw error

  return data.map(({ package: { cover, package_destination }, ...rest }) => ({
    ...rest,
    cover,
    destinations: package_destination.map(
      ({
        destination: {
          coordinates,
          cover,
          destination_translations: [translation],
        },
        days,
        nights,
      }) => ({
        name: translation?.name ?? '',
        description: translation?.description ?? '',
        days,
        nights,
        coordinates,
        cover,
      }),
    ),
  }))[0]
}

import { getBlurHashColor } from '$core/utils/image'
import type { Api } from '$lib/api'
import { notFound } from '$lib/services/server'
import { api } from '../services/api'
import type { Language } from '../utils/language'

export async function getPackage(options: { language: Language; id: string }): Promise<Api.Package> {
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
        package_schedule (
          order,
          start,
          end
        ),
        package_destination!inner (
          days,
          nights,
          destination!inner (
            id,
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
          cover: {
            id: string
            title: string
            width: number
            height: number
            blurhash: string
          }
          package_schedule: {
            order: number
            start: string
            end: string
          }[]
          package_destination: {
            days: number
            nights: number
            destination: {
              id: string
              coordinates: [number, number]
              cover: {
                id: string
                title: string
                width: number
                height: number
                blurhash: string
              }
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

  const [item] = data.map(({ package: { cover, package_schedule, package_destination }, ...rest }) => ({
    ...rest,
    cover: { ...cover, color: getBlurHashColor(cover.blurhash) },
    schedule: package_schedule
      .sort((a, b) => a.order - b.order)
      .map(({ start, end }) => ({ start: new Date(start), end: new Date(end) })),
    destinations: package_destination.map(
      ({
        destination: {
          id,
          coordinates,
          cover,
          destination_translations: [translation],
        },
        days,
        nights,
      }) => ({
        id,
        name: translation?.name ?? '',
        description: translation?.description ?? '',
        days,
        nights,
        coordinates,
        cover: { ...cover, color: getBlurHashColor(cover.blurhash) },
      }),
    ),
  }))

  if (!item) throw notFound(`No se encontró el paquete`)

  return item
}

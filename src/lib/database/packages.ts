import { getBlurHashColor } from '$core/utils/image'
import type { Api } from '$lib/api'
import { notFound } from '$lib/services/server'
import { api } from '../services/api'
import type { Language } from '../utils/language'

const uuidRegexp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
export async function getPackage(options: { language: Language; id: string }): Promise<Api.Package> {
  if (!uuidRegexp.test(options.id)) throw notFound(`No se encontró el paquete`)

  const { data, error } = await api
    .from('package')
    .select(
      `
      id,
      translations:package_translations!inner (
        name,
        price,
        description,
        content,
        notes
      ),
      cover (
        id:filename_disk,
        title,
        width,
        height,
        blurhash
      ),
      schedule:package_schedule (
        order,
        start,
        end
      ),
      destinations:package_destination (
        days,
        nights,
        destination (
          id,
          coordinates->coordinates,
          cover (
            id:filename_disk,
            title,
            width,
            height,
            blurhash
          ),
          translations:destination_translations!inner (
            name,
            description
          )
        )
      ),
      images:package_gallery (
        image:directus_files (
          id:filename_disk,
          title
        )
      ),
      videos,
      attachments:package_files (
        attachment:directus_files (
          id:filename_disk,
          title,
          description,
          type,
          filename:filename_download,
          filesize
        )
      )`,
    )
    .eq('id', options.id)
    .eq('status', 'published')
    .eq('package_translations.languages_code', options.language.locale)
    .eq('package_destination.destination.destination_translations.languages_code', options.language.locale)
    .throwOnError()
    .returns<
      {
        id: string
        destinations: {
          days: number | null
          nights: number | null
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
            translations: [
              {
                name: string
                description: string
              },
            ]
          }
        }[]
        translations: [
          {
            name: string
            price: string
            description: string
            content: string
            notes: string
          },
        ]
        cover: {
          id: string
          title: string
          width: number
          height: number
          blurhash: string
        }
        schedule: {
          order: number
          start: string
          end: string
        }[]
        images: {
          image: {
            id: string
            title: string
          }
        }[]
        videos: {
          id: string
          title: string
        }[]
        attachments: {
          attachment: {
            id: string
            title: string
            description: string
            type: string
            filename: string
            filesize: number
          }
        }[]
      }[]
    >()

  if (error) throw error

  const [item] = data.map(
    ({
      id,
      translations: [{ name, price, description, content, notes }],
      cover,
      destinations,
      schedule,
      images,
      videos,
      attachments,
    }) => ({
      id,
      name,
      price,
      description,
      content,
      notes,
      cover: { ...cover, color: getBlurHashColor(cover.blurhash) },
      schedule: schedule
        .sort((a, b) => a.order - b.order)
        .map(({ start, end }) => ({ start: new Date(start), end: new Date(end) })),
      destinations: destinations.map(
        ({
          destination: {
            id,
            coordinates,
            cover,
            translations: [{ name, description }],
          },
          days,
          nights,
        }) => ({
          id,
          name,
          description,
          days,
          nights,
          coordinates,
          cover: { ...cover, color: getBlurHashColor(cover.blurhash) },
        }),
      ),
      gallery: [
        ...images.map(({ image }) => ({ type: 'image', ...image } as const)),
        ...videos.map((video) => ({ type: 'video', ...video } as const)),
      ],
      videos,
      attachments: attachments.map(({ attachment }) => attachment),
    }),
  )

  if (!item) throw notFound(`No se encontró el paquete`)

  return item
}

import { getBlurHashColor } from '$core/utils/image'
import type { Api } from '$lib/api'
import { api } from '../services/api'
import type { Language } from '../utils/language'

export async function getBanners(options: { language: Language }): Promise<Api.Banner[]> {
  const request = api
    .from('package_translations')
    .select(
      `
      name,
      description,
      package(
        id,
        cover!inner(
          id:filename_disk,
          title,
          width,
          height,
          blurhash
        )
      )`,
    )
    .eq('languages_code', options.language.locale)
    .eq('package.status', 'published')
    .eq('package.favorite', true)
    .returns<
      {
        name: string
        description: string
        package: {
          id: string
          cover: {
            id: string
            title: string
            width: number
            height: number
            blurhash: string
          }
        }
      }[]
    >()

  const { data, error } = await request.throwOnError()

  if (error) throw error

  return data.map(({ name, description, package: { id, cover } }) => ({
    type: 'package',
    id,
    name,
    description,
    cover: { ...cover, color: getBlurHashColor(cover.blurhash) },
  }))
}

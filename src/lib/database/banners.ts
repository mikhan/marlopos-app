import { getBlurHashColor } from '$core/utils/image'
import { api } from '../services/api'
import type { Language } from '../utils/language'

export async function getBanners(options: { language: Language }): Promise<Api.Banner[]> {
  console.log('getBanners')
  const request = api
    .from('package_translations')
    .select(`id, name, description, package( cover!inner( id:filename_disk, title, width, height, blurhash ) )`)
    .eq('languages_code', options.language.locale)
    .eq('package.status', 'published')
    .eq('package.favorite', true)

  const { data, error } = await request.throwOnError().returns<
    {
      id: string
      name: string
      description: string
      package: {
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

  if (error) throw error

  return data.map(({ package: { cover }, ...rest }) => ({
    ...rest,
    cover: { ...cover, color: getBlurHashColor(cover.blurhash) },
  }))
}

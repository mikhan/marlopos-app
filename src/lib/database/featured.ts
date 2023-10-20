import { getBlurHashColor } from '$core/utils/image'
import type { Api } from '$lib/api'
import { api } from '$lib/services/api'
import type { Language } from '$lib/utils/language'

export async function getFeatured(options: { language: Language }): Promise<Api.Banner[]> {
  const request = api
    .from('featured')
    .select(
      `
      references:featured_items (
        collection,
        item
      )`,
    )
    .order('order', { foreignTable: 'featured_items' })
    .returns<{ references: { collection: string; item: string }[] }[]>()
    .single()

  const { data, error } = await request

  if (error) throw error

  const packageIds = data.references.filter(({ collection }) => collection === 'package').map(({ item }) => item) ?? []

  const collections: Record<string, Api.Banner[]> = await awaitObject({
    package: fetchPackages(packageIds, { language: options.language }),
  })

  const result: Api.Banner[] = []
  for (const reference of data.references) {
    const item = collections[reference.collection]?.find(({ id }) => id === reference.item)

    if (item) result.push(item)
  }

  return result
}

async function fetchPackages(ids: string[], options: { language: Language }): Promise<Api.Banner[]> {
  const request = api
    .from('package_translations')
    .select(
      `
    name,
    description,
    package!inner (
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
    .in('package.id', ids)
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

async function awaitObject<T extends Record<string, Promise<Api.Banner[]>>>(object: T) {
  const entries = Object.entries(object)
  const values = await Promise.all(entries.map(([, value]) => value))

  return Object.fromEntries(entries.map(([key], index) => [key, values[index]])) as { [K in keyof T]: Awaited<T[K]> }
}

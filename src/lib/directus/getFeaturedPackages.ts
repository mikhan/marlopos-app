import { fromCollection } from './api'
import { assertIsNonNullable, assertIsObject } from '$lib/core/utils/assert'

export interface FeaturedPackage {
  id: string
  name: string
  description: string
  url: string
  cover: {
    id: string
    title: string
    url: string
    width: number
    height: number
    blurhash: string
  }
}

export async function getFeaturedPackages({ lang }: { lang: string }): Promise<FeaturedPackage[]> {
  const items = await fromCollection('package_translations', {
    fields: [
      'package_id.id',
      'name',
      'description',
      'package_id.cover.id',
      'package_id.cover.title',
      'package_id.cover.width',
      'package_id.cover.height',
      'package_id.cover.blurhash',
    ],
    filter: {
      languages_code: { code: { _starts_with: lang } },
      package_id: {
        status: { _eq: 'published' },
        favorite: { _eq: true },
      },
    },
  })

  return items.transform((item) => {
    assertIsObject(item.package_id)
    assertIsObject(item.package_id.cover)
    assertIsNonNullable(item.package_id.cover.title)
    assertIsNonNullable(item.package_id.cover.width)
    assertIsNonNullable(item.package_id.cover.height)
    assertIsNonNullable(item.package_id.cover.blurhash)

    return {
      id: item.package_id.id,
      name: item.name,
      description: item.description,
      url: `/${lang}/packages/${item.package_id.id}`,
      cover: {
        id: item.package_id.cover.id,
        title: item.package_id.cover.title,
        url: `/assets/${item.package_id.cover.id}?key=cover`,
        width: item.package_id.cover.width,
        height: item.package_id.cover.height,
        blurhash: item.package_id.cover.blurhash,
      },
    }
  })

  // return await fetchMany(
  //   api.items('package_translations').readByQuery({
  //     fields: [
  //       'package_id.id',
  //       'name',
  //       'description',
  //       'package_id.cover.id',
  //       'package_id.cover.title',
  //       'package_id.cover.width',
  //       'package_id.cover.height',
  //       'package_id.cover.blurhash',
  //     ],
  //     filter: {
  //       languages_code: { code: { _starts_with: lang } },
  //       package_id: {
  //         status: { _eq: 'published' },
  //         favorite: { _eq: true },
  //       },
  //     },
  //   }),
  //   function (item) {
  //     assertIsObject(item.package_id)
  //     assertIsObject(item.package_id.cover)
  //     assertIsNonNullable(item.package_id.cover.title)
  //     assertIsNonNullable(item.package_id.cover.width)
  //     assertIsNonNullable(item.package_id.cover.height)
  //     assertIsNonNullable(item.package_id.cover.blurhash)

  //     return {
  //       id: item.package_id.id,
  //       name: item.name,
  //       description: item.description,
  //       url: `/${lang}/packages/${item.package_id.id}`,
  //       cover: {
  //         id: item.package_id.cover.id,
  //         title: item.package_id.cover.title,
  //         url: `/assets/${item.package_id.cover.id}?key=cover`,
  //         width: item.package_id.cover.width,
  //         height: item.package_id.cover.height,
  //         blurhash: item.package_id.cover.blurhash,
  //       },
  //     }
  //   },
  // )
}

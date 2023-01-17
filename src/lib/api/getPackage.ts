import type { FeaturedPackage } from '$lib/interfaces/featured-package'
import { assertIsNonNullable, assertIsObject, api, fetchMany } from '../api'

export async function getFeaturedPackages(): Promise<FeaturedPackage[]>{
  return await fetchMany(
    api.items('package_translations').readByQuery({
      fields: [
        'package_id.id',
        'name',
        'description',
        'package_id.cover.id',
        'package_id.cover.title',
      ],
      filter: {
        languages_code: { code: { _starts_with: 'en' } },
        package_id: {
            status: { _eq: 'published' },
            favorite: { _eq: true },
        },
      },
      // deep: {
      //   package_id: {
      //     _filter: {
      //       status: { _eq: 'published' },
      //       favorite: { _eq: true },
      //     },
      //   },
      // },
    }),
    (item, i) => {
      assertIsObject(item.package_id, `item[${i}].package_id`)
      assertIsObject(item.package_id.cover, `item[${i}].package_id.cover`)
      assertIsNonNullable(item.package_id.cover.title, `item[${i}].package_id.cover.title`)

      return {
        id: item.package_id.id,
        name: item.name,
        description: item.description,
        cover: {
          id: item.package_id.cover.id,
          title: item.package_id.cover.title,
        },
      }
    },
  )
}
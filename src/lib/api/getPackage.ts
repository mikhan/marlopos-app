import { fromCollection } from '../api'
import { assertIsNonNullable, assertIsObject } from '../utils/assert'

export async function getFeaturedPackages() {
  const response = await fromCollection('package_translations', {
    fields: ['package_id.id', 'name', 'description', 'package_id.cover.id', 'package_id.cover.title'],
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
  })

  return response.transform((item, i) => {
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
  })
}

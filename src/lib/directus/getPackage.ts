import { fromCollection } from './api'
import { assertIsNonNullable, assertIsObject } from '$lib/core/utils/assert'

export async function getPackage(id: string) {
  const items = await fromCollection('package_translations', {
    filter: {
      // languages_code: { code: { _starts_with: 'en' } },
      package_id: { id: { _eq: id } },
    },
    fields: ['package_id.id', 'name', 'description', 'package_id.cover.id', 'package_id.cover.title'],
  })

  return items.transform((item) => {
    assertIsObject(item.package_id, `item.package_id`)
    assertIsObject(item.package_id.cover, `item.package_id.cover`)
    assertIsNonNullable(item.package_id.cover.title, `item.package_id.cover.title`)

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

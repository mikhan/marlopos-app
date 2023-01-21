import type { PageServerLoad } from './$types'
import { fromCollection } from '$lib/api'
import { assertIsNonNullable, assertIsObject } from "$lib/utils/assert"
import { error } from '@sveltejs/kit'

export const load = (async ({ params }) => {
  const id = params.id
  const [content] = await getPackage(id)

  console.log('content', content)

  if (!content) {
    throw error(404, { message: 'Not found', code: '404' })
  }

  return { content }
}) satisfies PageServerLoad

async function getPackage(id: string) {
  const items = await fromCollection('package_translations', {
    filter: {
      // languages_code: { code: { _starts_with: 'en' } },
      package_id: { id: { _eq: id } },
    },
    fields: [
      'package_id.id',
      'name',
      'description',
      'package_id.cover.id',
      'package_id.cover.title',
    ],
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

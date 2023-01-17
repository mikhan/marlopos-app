import type { PageServerLoad } from './$types'
import { assertIsNonNullable, assertIsObject, api, fetchMany, fetchOne } from '$lib/api'
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
  const query = api.items('package_translations').readByQuery({
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

  return await fetchMany(query, (item) => {
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

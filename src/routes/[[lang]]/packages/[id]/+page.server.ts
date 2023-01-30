import { error } from '@sveltejs/kit'
import { fromCollection } from '$lib/directus/api'
import { assertIsNonNullable, assertIsObject } from '$core/utils/assert'
import { getLanguage, type Language } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

async function getPackage({ id, language }: { id: string; language: Language }) {
  const items = await fromCollection('package_translations', {
    fields: ['package_id.id', 'name', 'description', 'package_id.cover.id', 'package_id.cover.title'],
    filter: {
      languages_code: { code: { _eq: language.locale } },
      package_id: {
        id: { _eq: id },
      },
    },
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

export const load = (async ({ params }) => {
  const language = getLanguage(params.lang)
  const id = params.id
  const [content] = await getPackage({ id, language })

  if (!content) {
    throw error(404, { message: 'Not found' })
  }

  return { content }
}) satisfies PageServerLoad

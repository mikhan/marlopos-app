import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { getPackage } from '$lib/directus/getPackage'

export const load = (async ({ params }) => {
  const id = params.id
  const [content] = await getPackage(id)

  if (!content) {
    throw error(404, { message: 'Not found', code: '404' })
  }

  return { content }
}) satisfies PageServerLoad

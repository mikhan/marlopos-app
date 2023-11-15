import { json } from '@sveltejs/kit'
import { getFeatured } from '$lib/database/featured'
import type { EntryGenerator, RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) => {
  return json(await getFeatured({ language: locals.lang }))
}

export const entries: EntryGenerator = () => [{ lang: 'es' }, { lang: 'en' }]

export const prerender = true

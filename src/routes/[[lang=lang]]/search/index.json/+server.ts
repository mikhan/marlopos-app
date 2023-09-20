import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params }) => {
  const { lang } = params
  console.log('RENDER search', { lang })
  return json({ name: 'Jorge', lang })
}

export const prerender = true

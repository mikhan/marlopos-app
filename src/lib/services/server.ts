import { error } from '@sveltejs/kit'

export const notFound = (mesage: string) => error(404, mesage)

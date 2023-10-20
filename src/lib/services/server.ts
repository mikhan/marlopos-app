import { error } from '@sveltejs/kit'

export const notFound = (message: string) => error(404, message)

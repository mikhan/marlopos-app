import { Directus, type Item, type ManyItems, type OneItem } from '@directus/sdk'
import { API_URL, API_TOKEN } from '$env/static/private'
import type { CustomDirectusTypes } from '$lib/interfaces/collections'

export const api = new Directus<CustomDirectusTypes>(API_URL, {
  auth: { staticToken: API_TOKEN },
})

export class AssertError extends Error {
  name = 'AssertError'
}

export function assertIsObject(value: unknown, e?: string | Error): asserts value is object {
  assertIsNonNullable(value, e)
  assert(value, (value) => typeof value === 'object', e ?? 'Value must be an object')
}

export function assertIsNonNullable<T>(value: T, e?: string | Error): asserts value is NonNullable<T> {
  assert(value, (value) => typeof value !== 'undefined', e ?? 'Value must be defined')
  assert(value, (value) => value !== null, e ?? 'Value must be non null')
}

export function assert<T>(
  value: unknown,
  validator: (v: typeof value) => boolean,
  e: string | Error,
): asserts value is T {
  if (validator(value) !== true) {
    throw typeof e === 'string' ? new AssertError(e) : e
  }
}

export async function fetchOne<R, T extends Item, Q extends OneItem<T>>(
  query: Promise<Q>,
  formatter: (item: NonNullable<Q>) => R,
): Promise<R | null> {
  const data = await query

  if(typeof data === 'object' && data !== null){
    return formatter(data)
  }

  return null
}

export async function fetchMany<R, T extends Item, Q extends ManyItems<T>>(
  query: Promise<Q>,
  formatter: (item: NonNullable<Awaited<typeof query>['data']>[number], index: number) => R,
): Promise<R[]> {
  return (await query).data?.map((item, index) => formatter(item, index)) ?? []
}
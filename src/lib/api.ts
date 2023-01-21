import { Directus, type ManyItems, type PickedDefaultItem, type QueryMany, type TypeOf } from '@directus/sdk'
import { API_URL, API_TOKEN } from '$env/static/private'
import type { CustomDirectusTypes } from '$lib/interfaces/collections'
import { JsonCache } from './types/json-cache'
import { simpleHash } from './utils/cripto'

const api = new Directus<CustomDirectusTypes>(API_URL, {
  auth: { staticToken: API_TOKEN },
})

const cache = new JsonCache('node_modules/.directus-cache')

export async function fromCollection<
  C extends keyof CustomDirectusTypes,
  Q extends QueryMany<TypeOf<CustomDirectusTypes, C>>,
>(collection: C, query: Q) {
  type Item = PickedDefaultItem<TypeOf<CustomDirectusTypes, C>, Q['fields']>

  const key = JSON.stringify({ collection, query })
  const hash = simpleHash(key)
  let response = await cache.get<ManyItems<TypeOf<CustomDirectusTypes, C>, Q>>(hash)

  log(!!response, collection, query.filter)

  if (!response) {
    response = await api.items(collection).readByQuery(query)
    cache.set(hash, response)
  }

  const data = (response.data ?? []) as Item[]

  return {
    data,
    transform<R>(transformer: (item: Item, index: number) => R): R[] {
      return data.map(transformer)
    },
  }
}

function log(fromCache: boolean, collection: string, filter: Record<string, unknown> = {}) {
  const request =
    JSON.stringify(filter)
      .replace(/"(\w+)":/g, (_, s) => s)
      .slice(0, 50) + '...'
  console.log(`${fromCache ? 'From cache' : 'Request'}: ${collection}<${request}>`)
}

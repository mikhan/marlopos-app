import { Directus, type PickedDefaultItem, type QueryMany, type TypeOf } from '@directus/sdk'
import { API_URL, API_TOKEN } from '$env/static/private'
import type { CustomDirectusTypes } from './collections'
// import { JsonCache } from '$core/types/json-cache'
// import { simpleHash } from '$core/utils/cripto'

const api = new Directus<CustomDirectusTypes>(API_URL, {
  auth: { staticToken: API_TOKEN },
})

// const cache = new JsonCache('node_modules/.directus-cache')

export async function fromCollection<
  C extends keyof CustomDirectusTypes,
  Q extends QueryMany<TypeOf<CustomDirectusTypes, C>>,
>(collection: C, query: Q) {
  type Item = PickedDefaultItem<TypeOf<CustomDirectusTypes, C>, Q['fields']>

  // const key = JSON.stringify({ collection, query })
  // const hash = simpleHash(key)
  // let response = await cache.get<ManyItems<TypeOf<CustomDirectusTypes, C>, Q>>(hash)
  const response = await api.items(collection).readByQuery(query)

  // if (!response) {
  //   response = await api.items(collection).readByQuery(query)
  //   cache.set(hash, response)
  // }

  const data = (response.data ?? []) as Item[]

  return {
    data,
    transform<R>(transformer: (item: Item, index: number) => R): R[] {
      return data.map(transformer)
    },
  }
}

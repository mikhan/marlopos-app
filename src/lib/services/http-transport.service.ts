import { Transport, type TransportOptions, type TransportResponse } from '@directus/sdk'
import { simpleHash } from '$lib/utils/cripto'
import { JsonCache } from '$lib/types/json-cache'

export class HttpTransportService extends Transport {
  private readonly cache = new JsonCache('node_modules/.directus-cache')

  override async get<T = any>(path: string, options?: TransportOptions): Promise<TransportResponse<T>> {
    const hash = getRequestHash(path, options)
    let response = await this.cache.get<TransportResponse<T>>(hash)

    if (!response) {
      response = await super.get(path, options)
      this.cache.set(hash, response)
    }else{
      console.log('from cache')
    }

    return response
  }
}

function getRequestHash(path: string, options?: TransportOptions) {
  return simpleHash(JSON.stringify({ path, options }))
}

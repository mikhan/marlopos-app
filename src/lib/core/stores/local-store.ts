import type { JsonValue } from '$lib/core/interfaces/json-value'
import { writable, type Writable } from 'svelte/store'
import { JsonLocalStorage, jsonLocalStorage } from '../services/json-local-storage'

export function createLocalValue<T extends JsonValue>(key: string, initialValue: T): Writable<T> {
  const storage = jsonLocalStorage as JsonLocalStorage<T>
  let value = storage.getItem(key)

  if (value === null) {
    value = initialValue
    storage.setItem(key, value)
  }

  const { subscribe, set, update } = writable<T>(value)

  return {
    subscribe,
    set(value: T) {
      storage.setItem(key, value)

      return set(value)
    },
    update,
  }
}

import type { JsonValue } from '../interfaces/json-value'

export class JsonLocalStorage<T extends JsonValue = JsonValue> {
  getItem(key: string): T | null {
    const item = localStorage.getItem(key)

    return item !== null ? (JSON.parse(item) as T) : null
  }

  setItem(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const jsonLocalStorage = new JsonLocalStorage()

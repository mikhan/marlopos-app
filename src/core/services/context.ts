import { getContext, setContext } from 'svelte'

export interface Context<T> {
  get: () => T
  set: (context: T) => T
}

export function createContext<T>(name = ''): Context<T> {
  const key = Symbol(name)
  return {
    get: () => getContext<T>(key),
    set: (context: T) => setContext(key, context),
  }
}

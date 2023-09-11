import { getContext, setContext } from 'svelte'

export type ContextGetter<T> = () => T
export type ContextSetter<T> = (context: T) => T

export function createContext<T>(): [ContextGetter<T>, ContextSetter<T>] {
  const key = Symbol()
  const getter = () => getContext<T>(key)
  const setter = (context: T) => setContext(key, context)

  return [getter, setter]
}

import { writable, type Readable } from 'svelte/store'

const { subscribe, update } = writable<number>(0, () => {
  console.log('got a subscriber')
  return () => console.log('no more subscribers')
})

export const countStore: Readable<number> = { subscribe }

export function increment() {
  console.log('increment')
  update((value) => ++value)
}

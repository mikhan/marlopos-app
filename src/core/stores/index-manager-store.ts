import { type Readable, writable } from 'svelte/store'
import { IndexManager } from '../types/index-manager'

export class IndexManagerStore extends IndexManager implements Readable<number> {
  #index$ = writable(this.index)

  override set index(index: number) {
    super.index = index
    this.#index$.set(this.index)
  }

  override get index() {
    return super.index
  }

  subscribe = this.#index$.subscribe
}

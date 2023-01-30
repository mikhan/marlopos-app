import { clamp, mod } from '../utils/math'

export type IndexManagerOptions = {
  index?: number
  loop?: boolean
}

export class IndexManager {
  #size: number
  #index: number
  #loop: boolean

  get size() {
    return this.#size
  }

  set size(size: number) {
    this.#size = size

    if (this.index > size) {
      this.index = size
    }
  }

  get index() {
    return this.#index
  }

  set index(index: number) {
    index = this.calculateIndex(index)

    if (this.#index !== index) {
      this.#index = index
    }
  }

  constructor(size: number, { index = 0, loop = false }: IndexManagerOptions = {}) {
    this.#size = size
    this.#loop = loop
    this.#index = this.calculateIndex(index)
  }

  first() {
    this.index = 0
  }

  last() {
    this.index = this.#size - 1
  }

  previous() {
    this.index = this.index - 1
  }

  next() {
    this.index = this.index + 1
  }

  private calculateIndex(index: number): number {
    if (index === 0 || this.#size === 0) return 0

    return this.#loop ? mod(index, this.#size) : clamp(0, this.#size - 1, index)
  }
}

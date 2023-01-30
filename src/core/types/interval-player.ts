import { writable, type Readable } from 'svelte/store'

export type IntervalPlayerState = 'playing' | 'paused' | 'stopped'

export class IntervalPlayer {
  #id?: NodeJS.Timer | void
  #state: IntervalPlayerState = 'stopped'
  #enabled = true

  get enabled() {
    return this.#enabled
  }

  set enabled(enabled: boolean) {
    if (this.#enabled !== enabled) {
      this.#enabled = enabled
      this.restart()
    }
  }

  get state() {
    return this.#state
  }

  set state(state: IntervalPlayerState) {
    if (this.#state !== state) {
      this.#state = state
      this.restart()
    }
  }

  constructor(private callback: () => void, readonly delay: number) {}

  start() {
    this.state = 'playing'
  }

  stop() {
    this.state = 'stopped'
  }

  pause() {
    if (this.state === 'playing') this.state = 'paused'
  }

  resume() {
    if (this.state === 'paused') this.state = 'playing'
  }

  restart() {
    if (this.#id) clearInterval(this.#id)

    if (this.enabled && this.#state === 'playing') {
      this.#id = setInterval(() => this.callback(), this.delay)
    }
  }
}

export class IntervalPlayerStore extends IntervalPlayer implements Readable<IntervalPlayerState> {
  #state$ = writable(this.state)

  override get state() {
    return super.state
  }

  override set state(state: IntervalPlayerState) {
    if (super.state === state) return

    super.state = state
    this.#state$.set(super.state)
  }

  subscribe = this.#state$.subscribe
}

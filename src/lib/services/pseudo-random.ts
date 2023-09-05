const m = 0x80000000 // 2**31;
const a = 1103515245
const c = 12345

export class PseudoRandom {
  #state: number

  constructor(seed: number) {
    this.#state = seed ? seed : Math.floor(Math.random() * (m - 1))
  }

  nextInt(): number {
    return (this.#state = (a * this.#state + c) % m)
  }

  nextFloat(): number {
    return this.nextInt() / (m - 1)
  }

  nextRange(start: number, end: number): number {
    const rangeSize = end - start
    const randomUnder1 = this.nextInt() / m
    return start + Math.floor(randomUnder1 * rangeSize)
  }

  choice<T>(array: T[]): T {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return array.at(this.nextRange(0, array.length))!
  }
}

export function between(min: number, max: number, value: number): number {
  return min + value * (max - min)
}

export function round(value: number, precision = 2): number {
  return Number(value.toFixed(precision))
}

export function mod(dividend: number, modulus: number): number {
  return ((dividend % modulus) + modulus) % modulus
}

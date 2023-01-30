export class AssertError extends Error {
  override name = 'AssertError'
}

export function assertIsObject(value: unknown, e?: string | Error): asserts value is object {
  assertIsNonNullable(value, e)
  assert(value, (value) => typeof value === 'object', e ?? 'Value must be an object')
}

export function assertIsNonNullable<T>(value: T, e?: string | Error): asserts value is NonNullable<T> {
  assert(value, (value) => typeof value !== 'undefined', e ?? 'Value must be defined')
  assert(value, (value) => value !== null, e ?? 'Value must not be null')
}

export function assert<T>(
  value: unknown,
  validator: (v: typeof value) => boolean,
  e: string | Error,
): asserts value is T {
  if (validator(value) !== true) {
    throw typeof e === 'string' ? new AssertError(e) : e
  }
}

export class AssertError extends Error {
  override name = 'AssertError'
}

export function assertIsDefined<T>(value: T, e?: string | Error): asserts value is Extract<T, undefined> {
  assert(value, (value) => typeof value !== 'undefined', e ?? 'Value must be defined.')
}

export function assertIsNonNullable<T>(value: T, e?: string | Error): asserts value is NonNullable<T> {
  assertIsDefined(value)
  assert(value, (value) => value !== null, e ?? 'Value must not be null.')
}

export function assertIsObject(value: unknown, e?: string | Error): asserts value is object {
  assertIsNonNullable(value)
  assert(value, (value) => typeof value === 'object', e ?? 'Value must be an object.')
}

export function assertIsNumber(value: unknown, e?: string | Error): asserts value is number {
  assertIsNonNullable(value)
  assert(value, (value) => typeof value === 'number', e ?? 'Value must be a number.')
  assert(value, (value) => Number.isNaN(value) === false, e ?? 'Value must be a valid number.')
}

export function assertIsFinite(value: unknown, e?: string | Error): asserts value is number {
  assertIsNumber(value)
  assert(value, (value) => Number.isFinite(value) === true, e ?? 'Value must be a finite number.')
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

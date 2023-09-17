import type { Action, ActionReturn } from 'svelte/action'
import type { Readable } from 'svelte/store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createConditionalAction<T extends Action<any, any, any>>(enabled: Readable<boolean>, action: T): T {
  return ((element: unknown, param: unknown) => {
    let actionReturn: ActionReturn | void

    enabled.subscribe((enabled) => {
      actionReturn?.destroy?.()
      actionReturn = undefined

      if (enabled) {
        actionReturn = action(element, param)
      }
    })
  }) as T
}

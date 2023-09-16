import { autoUpdate as _autoUpdate, computePosition } from '@floating-ui/dom'
import type {
  AutoUpdateOptions,
  ComputePositionConfig,
  ComputePositionReturn,
  FloatingElement,
  Padding,
  ReferenceElement,
  VirtualElement,
} from '@floating-ui/dom'
import { onDestroy } from 'svelte'
import type { Readable, Writable } from 'svelte/store'

export type ComputeConfig = Partial<ComputePositionConfig> & {
  onComputed?: (computed: ComputePositionReturn) => void
  autoUpdate?: boolean | Partial<AutoUpdateOptions>
}
export type UpdatePosition = (contentOptions?: Omit<ComputeConfig, 'autoUpdate'>) => void
export type ReferenceAction = (node: HTMLElement | Writable<VirtualElement> | VirtualElement) => void
export type ContentAction = (node: HTMLElement, contentOptions?: ComputeConfig) => void
export type ArrowOptions = { padding?: Padding; element: Writable<HTMLElement> }

export function createFloatingActions(initOptions?: ComputeConfig): [ReferenceAction, ContentAction, UpdatePosition] {
  let referenceElement: ReferenceElement
  let floatingElement: FloatingElement
  const defaultOptions: Partial<ComputeConfig> = {
    autoUpdate: true,
  }
  let options: ComputeConfig | undefined = initOptions

  const getOptions = (mixin?: object): ComputeConfig => {
    return { ...defaultOptions, ...(initOptions || {}), ...(mixin || {}) }
  }

  const updatePosition: UpdatePosition = (updateOptions) => {
    if (referenceElement && floatingElement) {
      options = getOptions(updateOptions)
      computePosition(referenceElement, floatingElement, options).then((v) => {
        Object.assign(floatingElement.style, {
          position: v.strategy,
          left: `${v.x}px`,
          top: `${v.y}px`,
        })
        options?.onComputed && options.onComputed(v)
      })
    }
  }

  const referenceAction: ReferenceAction = (node) => {
    if ('subscribe' in node) {
      setupVirtualElementObserver(node)
    } else {
      referenceElement = node
      updatePosition()
    }
  }

  const contentAction: ContentAction = (node, contentOptions) => {
    let autoUpdateDestroy: ReturnType<typeof _autoUpdate> | undefined
    floatingElement = node
    options = getOptions(contentOptions)
    setTimeout(() => updatePosition(contentOptions), 0) //tick doesn't work
    updatePosition(contentOptions)
    const destroyAutoUpdate = () => {
      if (autoUpdateDestroy) {
        autoUpdateDestroy()
        autoUpdateDestroy = undefined
      }
    }
    const initAutoUpdate = ({ autoUpdate } = options || {}): typeof autoUpdateDestroy => {
      destroyAutoUpdate()
      if (autoUpdate !== false) {
        return _autoUpdate(
          referenceElement,
          floatingElement,
          () => updatePosition(options),
          autoUpdate === true ? {} : autoUpdate,
        )
      }
      return
    }
    autoUpdateDestroy = initAutoUpdate()
    return {
      update(contentOptions: Parameters<typeof contentAction>[1]) {
        updatePosition(contentOptions)
        autoUpdateDestroy = initAutoUpdate(contentOptions)
      },
      destroy() {
        destroyAutoUpdate()
      },
    }
  }

  const setupVirtualElementObserver = (node: Readable<VirtualElement>) => {
    const unsubscribe = node.subscribe(($node) => {
      if (referenceElement === undefined) {
        referenceElement = $node
        updatePosition()
      } else {
        // Preserve the reference to the virtual element.
        Object.assign(referenceElement, $node)
        updatePosition()
      }
    })
    onDestroy(unsubscribe)
  }

  return [referenceAction, contentAction, updatePosition]
}

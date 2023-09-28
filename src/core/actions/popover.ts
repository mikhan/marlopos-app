import type { Action } from 'svelte/action'

type AlignX = 'left' | 'right'
type AlignY = 'top' | 'bottom'
type Align = `${AlignY} ${AlignX}` | `${AlignY} ${AlignX}, ${AlignY} ${AlignX}`
type PopoverType = 'auto' | 'manual' | '' | undefined | null
type PopoverAttributes = { anchor: string; anchoralign: Align; open: boolean }

export const popover: Action<HTMLElement, PopoverType, PopoverAttributes> = (element, type) => {
  element.setAttribute('popover', type || 'auto')
  let abortController: AbortController | null = null
  setPopover(type)

  return {
    update: (type) => setPopover(type),
    destroy: () => abortController?.abort(),
  }

  function setPopover(type: PopoverType) {
    if (type === null) {
      element.removeAttribute('popover')
      abortController?.abort()
    } else {
      element.setAttribute('popover', type || 'auto')
      const anchor = element.getAttribute('anchor')
      const anchorElement = anchor && document.getElementById(anchor)

      if (anchorElement) {
        const onToggle = (event: Event) => {
          const { newState } = event as Event & { newState: string }

          if (newState === 'open') {
            anchorAlign(element, anchorElement, element.getAttribute('anchoralign') ?? '')
          }
        }

        abortController = new AbortController()
        element.addEventListener('toggle', onToggle, { signal: abortController.signal })
      }
    }
  }
}

function anchorAlign(target: HTMLElement, anchor: HTMLElement, anchoralign: string) {
  const align = getAlign(anchoralign)
  const rect = anchor.getBoundingClientRect()
  target.style.setProperty(align.target.y, `${rect[align.anchor.y]}px`)
  target.style.setProperty(align.target.x, `${rect[align.anchor.x]}px`)
}

const isAlignX = (value: string): value is AlignX => ['left', 'right'].includes(value)
const isAlignY = (value: string): value is AlignY => ['top', 'bottom'].includes(value)

function getAlign(anchoralign?: string) {
  const anchor: { x: AlignX; y: AlignY } = { x: 'left', y: 'top' }
  const target: { x: AlignX; y: AlignY } = { x: 'left', y: 'top' }

  if (anchoralign) {
    const [anchorString, targetString] = anchoralign.split(',').map((s) => s.trim().replace(/\s+/g, ' ').split(' '))

    if (anchorString) {
      const [y, x] = anchorString
      anchor.y = y && isAlignY(y) ? y : 'top'
      anchor.x = x && isAlignX(x) ? x : 'left'
    }
    if (targetString) {
      const [y, x] = targetString
      target.y = y && isAlignY(y) ? y : 'top'
      target.x = x && isAlignX(x) ? x : 'left'
    }
  }

  return { anchor, target }
}

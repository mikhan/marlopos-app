import type { IControl, Map } from 'mapbox-gl'
import type { BoundingBox } from './map-utils'

import expandIcon from '$core/icons/expand.svg?src'
import compressIcon from '$core/icons/compress.svg?src'
import mountainSunIcon from '$core/icons/mountain-sun.svg?src'

export class FullscreenControl implements IControl {
  private container: HTMLElement
  private button: HTMLButtonElement
  private mapContainer?: HTMLElement

  private updateButton = () => {
    const isFullScreen = document.fullscreenElement === this.mapContainer
    this.button.innerHTML = isFullScreen ? compressIcon : expandIcon
  }

  constructor() {
    this.button = document.createElement('button')
    this.button.innerHTML = expandIcon
    this.button.addEventListener('click', () => this.onClick())

    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    this.container.append(this.button)
  }

  onAdd(map: Map) {
    this.mapContainer = map.getContainer()
    this.updateButton()
    document.addEventListener('fullscreenchange', this.updateButton)

    return this.container
  }

  onRemove() {
    this.container.parentNode?.removeChild(this.container)
    document.removeEventListener('fullscreenchange', this.updateButton)
  }

  onClick() {
    if (!document.fullscreenElement) {
      this.mapContainer?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
}

export class ResetBoundsControl implements IControl {
  private map: Map | undefined
  private container?: HTMLElement

  constructor(private boundingBox: BoundingBox) {}

  onAdd(map: Map) {
    this.map = map
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    const button = document.createElement('button')
    button.innerHTML = expandIcon

    button.addEventListener('click', () => this.onClick())
    this.container.append(button)
    return this.container
  }

  onRemove() {
    this.container?.parentNode?.removeChild(this.container)
    this.map = undefined
  }

  onClick() {
    this.map?.fitBounds(this.boundingBox)
  }
}

export class ToggleStyleControl implements IControl {
  private map: Map | undefined
  private container?: HTMLElement
  private current: string

  constructor(private styles: string[]) {
    this.current = this.styles[0] ?? ''
  }

  onAdd(map: Map) {
    this.map = map
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    const button = document.createElement('button')
    button.innerHTML = mountainSunIcon
    button.addEventListener('click', () => this.onClick())
    this.container.append(button)

    return this.container
  }

  onRemove() {
    this.container?.parentNode?.removeChild(this.container)
    this.map = undefined
  }

  onClick() {
    const index = (this.styles.indexOf(this.current) + 1) % this.styles.length
    this.current = this.styles[index] ?? this.current
    this.map?.setStyle(this.current)
  }
}

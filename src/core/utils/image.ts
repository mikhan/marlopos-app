import { decodeBlurHash } from 'fast-blurhash'
import { assertIsNonNullable } from './assert'

export type BlurhashImageOptions = {
  width?: number | undefined
  height?: number | undefined
  punch?: number | undefined
}

const DEFAULT_SIZE = 32

export function getBlurhashImageData(blurhash: string, options: BlurhashImageOptions = {}): ImageData {
  const { width = DEFAULT_SIZE, height = width ?? DEFAULT_SIZE, punch } = options
  const pixels = decodeBlurHash(blurhash, width, height, punch)

  return new ImageData(pixels, width, height)
}

export function getBlurhashUrl(blurhash: string, options: BlurhashImageOptions = {}): string {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  assertIsNonNullable(context, 'Error creating canvas context')
  renderBlurhash(context, blurhash, options)

  return canvas.toDataURL()
}

export function renderBlurhash(
  context: CanvasRenderingContext2D,
  blurhash: string,
  options: BlurhashImageOptions = {},
): void {
  const imageData = getBlurhashImageData(blurhash, options)
  context.putImageData(imageData, 0, 0)
}

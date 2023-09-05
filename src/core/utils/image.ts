import { decodeBlurHash, getBlurHashAverageColor } from 'fast-blurhash'
import { assertIsNonNullable } from './assert'

export type BlurhashImageOptions = {
  width?: number | undefined
  height?: number | undefined
  punch?: number | undefined
}

export type ColorRGB = {
  r: number
  g: number
  b: number
}

const DEFAULT_SIZE = 32
const getOptions = (options: BlurhashImageOptions) => ({
  width: options.width ?? DEFAULT_SIZE,
  height: options.height ?? options.width ?? DEFAULT_SIZE,
  punch: options.punch,
})

export function getBlurhashImageData(blurhash: string, options: BlurhashImageOptions = {}): ImageData {
  const { width, height, punch } = getOptions(options)
  const pixels = decodeBlurHash(blurhash, width, height, punch)

  return new ImageData(pixels, width, height)
}

export function getBlurhashUrl(blurhash: string, options: BlurhashImageOptions = {}): string {
  const { width, height, punch } = getOptions(options)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  assertIsNonNullable(context, 'Error creating canvas context')
  renderBlurhash(context, blurhash, { width, height, punch })

  return canvas.toDataURL('image/webp')
}

export function renderBlurhash(
  context: CanvasRenderingContext2D,
  blurhash: string,
  options: BlurhashImageOptions = {},
): void {
  const imageData = getBlurhashImageData(blurhash, options)
  context.putImageData(imageData, 0, 0)
}

export function getBlurHashColor(blurhash: string): string {
  const [r, g, b] = getBlurHashAverageColor(blurhash)
  return rgbToHex({ r, g, b })
}

// export function getAverageRGB(imageData: ImageData, { blockSize = 1 } = {}): ColorRGB {
//   const length = imageData.data.length
//   const rgb = { r: 0, g: 0, b: 0 }
//   let i = 0

//   do {
//     rgb.r += imageData.data[i] ?? 0
//     rgb.g += imageData.data[i + 1] ?? 0
//     rgb.b += imageData.data[i + 2] ?? 0
//   } while ((i += blockSize * 4) < length)

//   const count = length / 4 / blockSize

//   rgb.r = ~~(rgb.r / count)
//   rgb.g = ~~(rgb.g / count)
//   rgb.b = ~~(rgb.b / count)

//   return rgb
// }

// export function getElementAverageColor(element: HTMLImageElement | HTMLCanvasElement): string | null {
//   let canvas: HTMLCanvasElement

//   if (element instanceof HTMLImageElement) {
//     canvas = document.createElement('canvas')
//     canvas.width = 32
//     canvas.height = (element.height / element.width) * 32
//     canvas.getContext('2d')?.drawImage(element, 0, 0, canvas.width, canvas.height)
//   } else {
//     canvas = element
//   }

//   const imageData = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height)

//   if (!imageData) return null

//   return rgbToHex(getAverageRGB(imageData))
// }

export function rgbToHex({ r, g, b }: ColorRGB): string {
  const hex = (n: number) => n.toString(16).padStart(2, '0')

  return '#' + hex(r) + hex(g) + hex(b)
}

export function hexToRgb(hex: string): ColorRGB {
  const [r, g, b] = Array.from(hex.match(/[a-z0-9]{2}/gi) ?? [], (s) => parseInt(s, 16)) as [number, number, number]

  return { r, g, b }
}

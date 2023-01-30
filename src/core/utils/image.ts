import { decodeBlurHash } from 'fast-blurhash'

export type BlurhashImageOptions = {
  width: number
  height: number
  punch?: number
}

export function getBlurhashImageData(blurhash: string, options: BlurhashImageOptions): ImageData {
  const { width = 32, height = 32, punch } = options
  const pixels = decodeBlurHash(blurhash, width, height, punch)

  return new ImageData(pixels, width, height)
}

export function renderBlurhash(context: CanvasRenderingContext2D, blurhash: string, options: BlurhashImageOptions) {
  const imageData = getBlurhashImageData(blurhash, options)
  context.putImageData(imageData, 0, 0)
}

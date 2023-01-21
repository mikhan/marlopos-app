import { decodeBlurHash } from 'fast-blurhash'

export type BlurhashImageOptions = {
  width: number
  height: number
  punch?: number
}

export function blurhashImage(blurhash: string, options: BlurhashImageOptions): ImageData {
  const { width = 32, height = 32, punch } = options
  const pixels = decodeBlurHash(blurhash, width, height, punch)

  return new ImageData(pixels, width, height)
}

export type ImageLoader = (config: ImageLoaderConfig) => string

export type ImageLoaderConfig = {
  src: string
  width?: number
}

export type ImageConfig = {
  breakpoints?: number[]
}

const DEFAULT_BREAKPOINTS = [320, 640, 768, 1024, 1366, 1600, 1920]

let imageLoader: ImageLoader = ({ src }) => src
let imageConfig: ImageConfig = {}

export function setImageConfig(config: ImageConfig) {
  imageConfig = { breakpoints: DEFAULT_BREAKPOINTS, ...config }
}

export function setImageLoader(loader: ImageLoader): void {
  imageLoader = loader
}

export function getImageSrc(config: ImageLoaderConfig) {
  return imageLoader(config)
}

export function getImageConfig(): Readonly<ImageConfig> {
  return imageConfig
}

export function getImageSrcset(config: { src: string; breakpoints?: number[] }): string {
  const { src, breakpoints = DEFAULT_BREAKPOINTS } = config
  const srcset: string[] = []

  for (const width of breakpoints) {
    srcset.push(`${getImageSrc({ src, width })} ${width}w`)
  }

  return srcset.join(', ')
}

export type ImageLoader = (config: ImageLoaderConfig) => string

export type ImageLoaderConfig = {
  src: string
  width?: number
}

export type ImageConfig = {
  breakpoints?: number[]
}

const DEFAULT_BREAKPOINTS = [640, 960, 1280, 1600, 1920]

let imageLoader: ImageLoader = ({ src }) => new URL(src, 'http://localhost:81/assets/').href
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

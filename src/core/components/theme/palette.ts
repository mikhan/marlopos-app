import chroma, { type Color } from 'chroma-js'

export type Shade = { background: string; foreground: string; contrast: number }
export type Shades<T extends number[]> = Record<T[number], Shade>

export function generateShades<T extends number[]>(
  config: {
    color: string
    shade: number
    shades: T
  },
  { dark = false } = {},
): Shades<T> {
  const base = chroma(config.color)
  const [l, c, h] = base.oklch()
  const direction = dark ? -1000 : +1000
  const result: Record<string, Shade> = {}

  for (const shade of config.shades) {
    const delta = (config.shade - shade) / direction
    const lightness = l + delta
    const background = chroma.oklch(lightness, c, h)
    const foreground = getForegroundColor(background)
    const contrast = +chroma.contrast(background, foreground).toFixed(2)

    result[shade] = { background: background.hex(), foreground: foreground.hex(), contrast }
  }

  return result as Shades<T>
}

function getForegroundColor(background: Color, { contrastRatio = 7 } = {}) {
  const [l, c, h] = background.oklch()
  const direction = l > 0.5 ? -10 : +10
  let step = 0
  let lightness
  let foreground
  let contrast

  do {
    lightness = l + ++step / direction
    foreground = chroma.oklch(lightness, c, h)
    contrast = chroma.contrast(background, foreground)
    if (contrast >= contrastRatio) break
  } while (step < 10)

  return foreground
}

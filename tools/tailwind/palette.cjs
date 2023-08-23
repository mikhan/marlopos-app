/// <reference path="./.d.ts" />
const chroma = require('chroma-js')

const DEFAULT_CONFIG = {
  shade: 500,
  shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
}

/** @type {Tailwind.GeneratePalette} */
function generatePalette(config, { dark = false } = {}) {
  const colors = {}
  const variables = {}

  for (const [name, color] of Object.entries(config)) {
    const result = generateColor({ ...DEFAULT_CONFIG, ...(typeof color === 'string' ? { color } : color) }, { dark })

    colors[name] = {}

    for (const [shade, value] of Object.entries(result)) {
      colors[name][shade] = `rgb(var(--color-${name}-${shade}) / <alpha-value>)`
      variables[`--color-${name}-${shade}`] = value
    }
  }

  return { variables, colors }
}

/** @type {Tailwind.GenerateColor} */
export function generateColor(config, { dark = false } = {}) {
  const base = chroma(config.color)
  const [l, c, h] = base.oklch()
  const direction = dark ? -1000 : +1000
  const result = { DEFAULT: colorToVar(base) }

  for (const shade of config.shades) {
    const delta = (config.shade - shade) / direction
    const lightness = l + delta
    const background = chroma.oklch(lightness, c, h)

    result[shade] = colorToVar(background)
    result[`${shade}-fg`] = colorToVar(getForegroundColor(background))
  }

  return result
}

/** @type {Tailwind.GetForegroundColor} */
function getForegroundColor(background, { contrastRatio = 7 } = {}) {
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

/** @type {(color: import('chroma-js').Color) => string} */
const colorToVar = (color) => color.rgb().join(' ')

module.exports = { generatePalette }

/// <reference path="./.d.ts" />
const chroma = require('chroma-js')

const DEFAULT_SHADE = 500
const DEFAULT_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

/** @type {Tailwind.GeneratePalette} */
function generatePalette(config, { dark = false } = {}) {
  /** @type {any} */
  const colors = {}

  for (const [colorName, colorConfig] of Object.entries(config)) {
    colors[colorName] = generateColor(
      {
        color: typeof colorConfig === 'string' ? colorConfig : colorConfig.color,
        shade: (typeof colorConfig !== 'string' && colorConfig.shade) || DEFAULT_SHADE,
        shades: (typeof colorConfig !== 'string' && colorConfig.shades) || DEFAULT_SHADES,
      },
      { dark },
    )
  }

  return colors
}

/** @type {Tailwind.GenerateColor} */
function generateColor(config, { dark = false } = {}) {
  const [l, c, h] = chroma(config.color).oklch()
  const direction = dark ? -1000 : +1000
  const color = { DEFAULT: config.color }

  for (const shade of config.shades) {
    const delta = (config.shade - shade) / direction
    const lightness = l + delta
    const background = chroma.oklch(lightness, c, h).hex()

    color[shade] = background

    const foreground = getForegroundColor(background)
    if (foreground) color[`${shade}-fg`] = foreground
  }

  return color
}

/** @type {Tailwind.GetForegroundColor} */
function getForegroundColor(color, { contrastRatio = 7 } = {}) {
  const background = chroma(color)
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
    if (contrast >= contrastRatio) return foreground.hex()
  } while (step < 10)

  return null
}

module.exports = { generatePalette }

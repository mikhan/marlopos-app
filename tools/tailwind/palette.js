import chroma from 'chroma-js'

const DEFAULT_CONFIG = {
  shade: 500,
  shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
}

/** @type {import('./tailwind.d.ts').GeneratePalette} */
export function generatePalette(config, { dark = false } = {}) {
  const colors = {}
  for (const [name, color] of Object.entries(config)) {
    const result = generateColor({ ...DEFAULT_CONFIG, ...(typeof color === 'string' ? { color } : color) }, { dark })
    colors[name] = {}
    for (const [shade, value] of Object.entries(result)) {
      colors[name][shade] = value
    }
  }

  return colors
}

function transformColor(color, transformation = {}) {
  let [h, s, l] = color.hsl()
  h += transformation.h ?? 0
  s += transformation.s ?? 0
  l += transformation.l ?? 0
  return chroma({ h, s, l })
}

/** @type {import('./tailwind.d.ts').GenerateColor} */
export function generateColor(config, { dark = false } = {}) {
  const base = chroma(config.color)
  const from = transformColor(base, { l: 0.4, ...config.from })
  const to = transformColor(base, { l: -0.4, ...config.to })
  const result = { DEFAULT: colorToVar(base) }
  const colors = chroma.scale([from, to]).correctLightness().colors(config.shades.length)

  for (const [index, color] of Object.entries(colors)) {
    const background = chroma(color)
    const shade = config.shades[index]
    result[shade] = colorToVar(background)
    result[`${shade}-fg`] = colorToVar(getForegroundColor(background))
  }

  return result
}

/** @type {import('./tailwind.d.ts').GetForegroundColor} */
export function getForegroundColor(background, { contrastRatio = 7 } = {}) {
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

/** @type {import('./tailwind.d.ts').GenerateTailwindColors} */
export function generateTailwindColors(palette, alias) {
  const result = {}
  const vars = {}
  for (const [name, color] of Object.entries(palette)) {
    if (typeof color === 'string') {
      const value = getTailwindValue(name)
      result[name] = value
      vars[name] = value
      continue
    }

    result[name] = {}
    vars[name] = {}
    for (const [shade] of Object.entries(color)) {
      const value = getTailwindValue(name, shade)
      result[name][shade] = value
      vars[name][shade] = value
    }
  }

  if (alias) {
    return { ...result, ...generateTailwindColors(alias(vars)) }
  }

  return result
}

/** @type {import('./tailwind.d.ts').GenerateCssVariables} */
export function generateCssVariables(palette, alias) {
  const result = {}
  const vars = {}
  for (const [name, color] of Object.entries(palette)) {
    if (typeof color === 'string') {
      const varName = getCssVariableName(name)
      result[varName] = color
      vars[name] = `var(${varName})`
      continue
    }

    vars[name] = {}
    for (const [shade, value] of Object.entries(color)) {
      const varName = getCssVariableName(name, shade)
      result[varName] = value
      vars[name][shade] = `var(${varName})`
    }
  }

  if (alias) {
    return { ...result, ...generateCssVariables(alias(vars)) }
  }

  return result
}

/** @type {(color: import('chroma-js').Color) => string} */
export const colorToVar = (color) => color.rgb().join(' ')

/** @type {(name: string, shade?: string) => string} */
export const getCssVariableName = (name, shade = 'DEFAULT') => {
  return shade === 'DEFAULT' ? `--color-${name}` : `--color-${name}-${shade}`
}

/** @type {(name: string, shade?: string) => string} */
export const getTailwindValue = (name, shade = 'DEFAULT') => {
  return `rgb(var(${getCssVariableName(name, shade)}) / <alpha-value>)`
}

const DEFAULT_MIN_SCREEN = 360
const DEFAULT_MAX_SCREEN = 1040

/** @type {import('./tailwind.d.ts').CreateFluidValue} */
export const createFluidValue = (
  minSize,
  maxSize,
  minScreenSize = DEFAULT_MIN_SCREEN,
  maxScreenSize = DEFAULT_MAX_SCREEN,
) => {
  return `clamp(${pxToRem(minSize)}, ${getPreferredValue(minSize, maxSize, minScreenSize, maxScreenSize)}, ${pxToRem(
    maxSize,
  )})`
}

/** @type {import('./tailwind.d.ts').GetPreferredValue} */
const getPreferredValue = (minSize, maxSize, minScreenSize, maxScreenSize) => {
  const vwCalc = cleanNumber((100 * (maxSize - minSize)) / (maxScreenSize - minScreenSize))
  const remCalc = cleanNumber((minScreenSize * maxSize - maxScreenSize * minSize) / (minScreenSize - maxScreenSize))

  return `${vwCalc}vw + ${pxToRem(remCalc)}`
}

/** @type {(px: number, base?: number) => string} */
export const pxToRem = (px, base = 16) => `${cleanNumber(Number(px) / base)}rem`

/** @type {(px: number) => number} */
const cleanNumber = (num) => +num.toFixed(3) //Math.round((num + Number.EPSILON) * 100) / 100

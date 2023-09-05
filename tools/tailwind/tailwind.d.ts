export type PaletteConfig = {
  [K in string]: string | { color: string; shade?: number; shades?: number[] }
}

export type PaletteResult<T extends string> = Record<T, ColorResult>

export type ColorConfig = {
  color: string
  shade: number
  shades: number[]
}

export type Shades = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type ColorShades = Shades | `${Shades}-fg` | 'ABC' | 'DEFAULT'

export type ColorResult = Record<ColorShades, string>

export type GeneratePalette = <P extends PaletteConfig>(
  config: P,
  options?: { dark?: boolean },
) => PaletteResult<keyof P>

export type GenerateCssVariables = <P extends PaletteResult<string>>(
  palette: P,
  alias?: (palette: P) => P,
) => Record<string, string>
export type GenerateTailwindColors = <P extends PaletteResult<string>>(palette: P, alias?: (palette: P) => P) => P

export type GenerateColor = (config: ColorConfig, options?: { dark?: boolean }) => ColorResult

export type GetForegroundColor = (color: Color, options?: { contrastRatio?: number }) => string | null

export type CreateFluidValue = (
  minSize: number,
  maxSize: number,
  minScreenSize: number,
  maxScreenSize: number,
) => string

export type GetPreferredValue = (
  minSize: number,
  maxSize: number,
  minScreenSize: number,
  maxScreenSize: number,
) => string

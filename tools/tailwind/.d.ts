import chroma from 'chroma-js'

declare module 'chroma-js' {
  interface Color extends chroma.Color {
    oklch: () => ColorSpaces['lch']
  }

  interface ChromaStatic extends chroma.ChromaStatic {
    oklch(l: number, c: number, h: number): Color
  }
}

declare global {
  namespace Tailwind {
    type PaletteConfig = {
      [K in string]: string | { color: string; shade?: number; shades?: number[] }
    }

    type PaletteResult<T extends string> = Record<T, ColorResult>

    type ColorConfig = {
      color: string
      shade: number
      shades: number[]
    }

    type ColorResult = Record<string, string>

    type GeneratePalette = <P extends PaletteConfig>(config: P, options?: { dark?: boolean }) => PaletteResult<keyof P>

    type GenerateColor = (config: ColorConfig, options?: { dark?: boolean }) => ColorResult

    type GetForegroundColor = (color: Color, options?: { contrastRatio?: number }) => string | null
  }
}

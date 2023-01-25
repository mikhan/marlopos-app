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

    type PaletteResult = Record<string, Color>

    type ColorConfig = {
      color: string
      shade: number
      shades: number[]
    }

    type ColorResult = Record<string, string>

    type GeneratePalette = (config: PaletteConfig, options?: { dark?: boolean }) => PaletteResult

    type GenerateColor = (config: ColorConfig, options?: { dark?: boolean }) => ColorResult

    type GetForegroundColor = (color: string, options?: { contrastRatio?: number }) => string | null
  }
}

import colors from 'tailwindcss/colors'
import { createFluidValue, generatePalette, generateTailwindColors, pxToRem } from './tools/tailwind/palette'
import { cssVariablesPlugin } from './tools/tailwind/plugins/css-variables'
import { elevationPlugin } from './tools/tailwind/plugins/elevation'
import { focusablePlugin } from './tools/tailwind/plugins/focusable'
import { formPlugin } from './tools/tailwind/plugins/form'
import { hocusPlugin } from './tools/tailwind/plugins/hocus'
import { layoutPlugin } from './tools/tailwind/plugins/layout'
import { linkPlugin } from './tools/tailwind/plugins/link'
import { scrollbarPlugin } from './tools/tailwind/plugins/scrollbar'
import { squarePlugin } from './tools/tailwind/plugins/square'
import { textShadowPlugin } from './tools/tailwind/plugins/text-shadow'
import { textWrapPlugin } from './tools/tailwind/plugins/text-wrap'

const palette = generatePalette(
  {
    primary: { color: 'hsl(254, 66%, 52%)', from: { s: 1, l: 0.35 }, to: { s: -0.3 } },
    neutral: { color: 'hsl(215, 10%, 45%)', from: { s: 0.1, l: 0 }, to: { s: 0.3 } },
  },
  { dark: true },
)

const alias = (palette) => ({
  'base': palette.neutral['100'],
  'ring': palette.primary['100'],
  'link': palette.primary['50'],
  'canvas': {
    bg: palette.neutral['800'],
    fg: palette.neutral['800-fg'],
    border: palette.neutral['700'],
  },
  'surface-1': {
    bg: palette.neutral['600'],
    fg: palette.neutral['600-fg'],
    border: palette.neutral['500'],
    hover: palette.neutral['500'],
  },
  'surface-2': {
    bg: palette.neutral['400'],
    fg: palette.neutral['400-fg'],
    border: palette.neutral['300'],
    hover: palette.neutral['300'],
  },
  'surface-primary': {
    bg: palette.primary['300'],
    fg: palette.primary['300-fg'],
    border: palette.primary['200'],
    hover: palette.primary['200'],
  },
})

const fontSize = (fontSize, lineHeight) => [pxToRem(fontSize), pxToRem(fontSize * lineHeight)]

const fluidFontSize = (fontSize, lineHeight, scale) => [
  createFluidValue(fontSize, fontSize * scale),
  createFluidValue(fontSize * lineHeight, fontSize * scale * lineHeight),
]

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      ...generateTailwindColors(palette, alias),
    },
    container: {
      center: true,
    },
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    focusable: {
      border: {
        width: `1px`,

        offset: '0px',
      },
      outline: {
        width: `2px`,

        offset: '2px',
      },
      // primary: {
      //   width: `2px`,
      //   style: `solid`,
      //   color: 'colors.primary.500 / 50%',
      //   offset: '2px',
      // },
    },
    fontFamily: {
      sans: ['Quicksand Variable', 'sans-serif'],
      display: ['Rosarivo', 'sans-serif'],
      mono: ['monospace'],
    },
    extend: {
      fontSize: {
        'xs': [pxToRem(12), pxToRem(16)],
        'sm': [pxToRem(14), pxToRem(20)],
        'base': [pxToRem(16), pxToRem(24)],
        'lg': fontSize(18, 1.56),
        'lg-fluid': fluidFontSize(18, 1.56, 1.2),
        'xl': fontSize(20, 1.4),
        'xl-fluid': fluidFontSize(20, 1.4, 1.4),
        '2xl': fontSize(24, 1.33),
        '2xl-fluid': fluidFontSize(24, 1.33, 1.5),
        '3xl': fontSize(30, 1.2),
        '3xl-fluid': fluidFontSize(30, 1.2, 1.6),
        '4xl': fontSize(36, 1.11),
        '4xl-fluid': fluidFontSize(36, 1.11, 1.5),
        '5xl': fontSize(48, 1),
        '5xl-fluid': fluidFontSize(48, 1, 1.5),
      },
    },
  },
  plugins: [
    textShadowPlugin(),
    squarePlugin(),
    formPlugin(),
    linkPlugin(),
    textWrapPlugin(),
    cssVariablesPlugin(palette, alias),
    elevationPlugin(),
    hocusPlugin(),
    focusablePlugin(),
    layoutPlugin(),
    scrollbarPlugin(),
  ],
}

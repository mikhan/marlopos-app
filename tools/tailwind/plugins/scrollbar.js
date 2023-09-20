import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import plugin from 'tailwindcss/plugin'

export function scrollbarPlugin() {
  return plugin(
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          scrollbar: ([trackSize, thumbSize]) => {
            return {
              '--scrollbar-size': trackSize,
              '--scrollbar-track-color': 'transparent',
              '--scrollbar-thumb-color': 'currentColor',
              '&::-webkit-scrollbar': {
                'width': 'var(--scrollbar-size)',
                'height': 'var(--scrollbar-size)',
                'background-color': 'var(--scrollbar-track-color)',
              },
              '&::-webkit-scrollbar-corner ': {
                'background-color': 'var(--scrollbar-track-color)',
              },
              '&::-webkit-scrollbar-thumb': {
                'border': `calc(calc(${trackSize} - ${thumbSize}) / 2) solid transparent`,
                'border-radius': `calc(${trackSize} / 2)`,
                'background-color': 'var(--scrollbar-thumb-color)',
                'background-clip': 'content-box',
              },
            }
          },
        },
        { values: theme('scrollbar') },
      )

      matchUtilities(
        {
          scrollbar: (value) => {
            return {
              '--scrollbar-thumb-color': toColorValue(value),
            }
          },
        },
        { values: flattenColorPalette(theme('colors')), type: 'color' },
      )

      matchUtilities(
        {
          'scrollbar-track': (value) => {
            return {
              '--scrollbar-track-color': toColorValue(value),
            }
          },
        },
        { values: flattenColorPalette(theme('colors')), type: 'color' },
      )

      matchUtilities(
        {
          'scrollbar-border': (value) => {
            return {
              '&::-webkit-scrollbar:vertical': {
                'border-left': `1px solid ${toColorValue(value)}`,
              },
              '&::-webkit-scrollbar:horizontal': {
                'border-top': `1px solid ${toColorValue(value)}`,
              },
            }
          },
        },
        { values: flattenColorPalette(theme('colors')), type: 'color' },
      )
    },
    {
      theme: {
        scrollbar: {
          thin: ['16px', '4px'],
          DEFAULT: ['16px', '8px'],
        },
      },
    },
  )
}

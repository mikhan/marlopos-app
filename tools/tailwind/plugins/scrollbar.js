import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import plugin from 'tailwindcss/plugin'

export function scrollbarPlugin() {
  return plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        scrollbar: (value) => {
          return {
            '--scrollbar-track-color': 'transparent',
            '--scrollbar-thumb-color': 'currentColor',
            '&::-webkit-scrollbar': {
              'width': '12px',
              'height': '12px',
              'background-color': 'var(--scrollbar-track-color)',
            },
            '&::-webkit-scrollbar-corner ': {
              'background-color': 'var(--scrollbar-track-color)',
            },
            '&::-webkit-scrollbar-thumb': {
              'border': `calc(calc(12px - ${value}) / 2) solid transparent`,
              'border-radius': '6px',
              'background-color': 'var(--scrollbar-thumb-color)',
              'background-clip': 'content-box',
            },
          }
        },
      },
      {
        values: {
          thin: '4px',
          DEFAULT: '8px',
        },
      },
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
  })
}

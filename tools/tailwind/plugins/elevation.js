import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import plugin from 'tailwindcss/plugin'

export function elevationPlugin() {
  return plugin(
    function ({ addBase, addUtilities, matchUtilities, theme }) {
      addBase({
        ':root': {
          '--elevation-color': 'black',
        },
      })

      const elevations = theme('elevation')

      for (const [name, elevation] of Object.entries(elevations)) {
        addUtilities({
          [`.elevation-${name}`]: { 'box-shadow': elevation },
        })
      }

      matchUtilities(
        {
          elevation: (value) => {
            return { '--elevation-color': toColorValue(value) }
          },
        },
        { values: flattenColorPalette(theme('colors')), type: 'color' },
      )
    },
    {
      theme: {
        elevation: {
          low:
            '0px 1px 3px color-mix(in srgb, var(--elevation-color) 20%, transparent), ' +
            '0px 2px 6px color-mix(in srgb, var(--elevation-color) 10%, transparent)',
          hight:
            '0px 1px 3px color-mix(in srgb, var(--elevation-color) 20%, transparent), ' +
            '0px 2px 6px color-mix(in srgb, var(--elevation-color) 20%, transparent), ' +
            '0px 8px 24px color-mix(in srgb, var(--elevation-color) 20%, transparent)',
        },
      },
    },
  )
}

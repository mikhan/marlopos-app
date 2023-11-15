import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import plugin from 'tailwindcss/plugin'

export function elevationPlugin() {
  return plugin(
    function ({ addBase, addUtilities, matchUtilities, theme }) {
      addBase({
        ':root': {
          '--elevation-color': 'rgb(0 0 0 / 0.2)',
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
            const color = typeof value === 'function' ? value({ opacityValue: 0.2 }) : value
            return { '--elevation-color': color }
          },
        },
        { values: flattenColorPalette(theme('colors')), type: 'color' },
      )
    },
    {
      theme: {
        elevation: {
          low: '0px 1px 3px var(--elevation-color), ' + '0px 2px 6px var(--elevation-color)',
          hight:
            '0px 1px 3px var(--elevation-color), ' +
            '0px 2px 6px var(--elevation-color), ' +
            '0px 8px 24px var(--elevation-color)',
        },
      },
    },
  )
}

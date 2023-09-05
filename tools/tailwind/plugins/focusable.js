import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import toColorValue from 'tailwindcss/lib/util/toColorValue'
import plugin from 'tailwindcss/plugin'

export function focusablePlugin() {
  return plugin(function ({ addBase, addUtilities, matchUtilities, theme }) {
    const selectors = ['focus', 'focus-visible', 'focus-within']
    addBase({
      ':root': {
        '--focusable-offset': '2px',
        '--focusable-color': 'currentColor',
      },
    })

    matchUtilities(
      {
        focusable: (value) => {
          return { '--focusable-color': toColorValue(value) }
        },
      },
      { values: flattenColorPalette(theme('colors')), type: 'color' },
    )

    for (const selector of selectors) {
      const className = selector.replace('focus', 'focusable')
      addUtilities({
        [`.${className}`]: {
          '--focusable-direction': '1',
          'outline': '2px solid transparent',
          'outline-offset': 'calc(var(--focusable-offset) * var(--focusable-direction) * 4)',
          'transition-property': 'outline-color, outline-offset',
          'transition-duration': '150ms, 250ms',
          [`&:${selector}`]: {
            'outline-color': 'var(--focusable-color)',
            'outline-offset': 'calc(var(--focusable-offset) * var(--focusable-direction))',
          },
        },
      })
    }

    addUtilities({
      '.focusable-inner': {
        '--focusable-direction': '-1',
      },
    })
  })
}

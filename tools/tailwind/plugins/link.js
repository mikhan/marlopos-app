import { parseColorFormat } from 'tailwindcss/lib/util/pluginUtils'
import { withAlphaValue } from 'tailwindcss/lib/util/withAlphaVariable'
import plugin from 'tailwindcss/plugin'

const getColor = (value) => withAlphaValue(parseColorFormat(value))

export function linkPlugin() {
  return plugin(function ({ addComponents, theme }) {
    addComponents({
      '.link': {
        'color': getColor(theme('colors.link')),
        'outline': '2px solid transparent',
        'outline-offset': '8px',
        'transition-property': 'outline-color, outline-offset',
        'transition-duration': '150ms, 250ms',
        'border-radius': theme('borderRadius.DEFAULT'),
        '&:is(:hover, :active)': {
          'text-decoration': 'underline',
        },
        '&:focus-visible': {
          'outline-color': getColor(theme('colors.ring')),
          'outline-offset': '2px',
        },
      },
    })
  })
}

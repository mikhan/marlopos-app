import { parseColorFormat } from 'tailwindcss/lib/util/pluginUtils'
import { withAlphaValue } from 'tailwindcss/lib/util/withAlphaVariable'
import plugin from 'tailwindcss/plugin'

const getColor = (value) => withAlphaValue(parseColorFormat(value))

export function formPlugin() {
  return plugin(function ({ addComponents, theme }) {
    addComponents({
      '.form-field': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
    })

    addComponents({
      '.form-input': {
        'display': 'block',
        'width': '100%',
        'min-height': theme('spacing.10'),
        'backgroundColor': getColor(theme('colors.surface-2.bg')),
        'color': getColor(theme('colors.surface-2.fg')),
        'borderRadius': theme('borderRadius.DEFAULT'),
        'boxShadow': theme('elevation.low'),
        'padding-inline-start': theme('spacing.2'),
        'outline': '2px solid transparent',
        'outlineOffset': '8px',
        'transitionProperty': 'outline-color, outline-offset',
        'transitionDuration': '150ms, 250ms',
        '&:focus-visible': {
          outlineColor: getColor(theme('colors.ring')),
          outlineOffset: '2px',
        },
        '&::placeholder': {
          color: theme('colors.surface-2.fg'),
          opacity: '0.5',
        },
      },
      'textarea.form-input': {
        padding: theme('spacing.2'),
      },
    })

    addComponents({
      '.form-label': {
        display: 'block',
        marginBottom: theme('spacing.2'),
        fontSize: theme('fontSize.sm[0]'),
        lineHeight: theme('fontSize.sm[1]'),
        fontWeight: theme('fontWeight.bold'),
      },
    })
  })
}

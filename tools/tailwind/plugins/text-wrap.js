import plugin from 'tailwindcss/plugin'

export function textWrapPlugin() {
  return plugin(function ({ addUtilities }) {
    addUtilities({
      [`.text-balance`]: {
        'text-wrap': 'balance',
      },
    })
  })
}

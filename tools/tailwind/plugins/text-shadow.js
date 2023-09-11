import plugin from 'tailwindcss/plugin'

export function textShadowPlugin() {
  return plugin(
    function ({ addUtilities, theme }) {
      const textShadows = theme('textShadow')

      for (const [name, textShadow] of Object.entries(textShadows)) {
        addUtilities({
          [`.text-shadow${name === 'DEFAULT' ? '' : `-${name}`}`]: {
            'text-shadow': textShadow,
          },
        })
      }
    },
    {
      theme: {
        textShadow: {
          DEFAULT: '0 2px 2px rgb(0 0 0 / 50%)',
        },
      },
    },
  )
}

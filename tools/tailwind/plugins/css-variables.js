import plugin from 'tailwindcss/plugin'
import { generateCssVariables } from '../palette'

export function cssVariablesPlugin(palette, alias) {
  return plugin(function ({ addBase }) {
    addBase({
      ':root': generateCssVariables(palette, alias),
      '::backdrop': generateCssVariables(palette, alias),
    })
  })
}

import plugin from 'tailwindcss/plugin'

export function hocusPlugin() {
  return plugin(function ({ addVariant }) {
    addVariant('hocus', ['&:hover', '&:focus'])
  })
}

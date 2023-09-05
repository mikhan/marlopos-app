import plugin from 'tailwindcss/plugin'

export function layoutPlugin() {
  return plugin(
    function ({ addUtilities, theme }) {
      const screens = Object.entries(theme('screens'))
        .map(([name, size]) => ({ name, size: size }))
        .sort((a, b) => parseInt(b.size) - parseInt(a.size))

      const vars = []
      let prevScreen

      vars.push(['--layout-padding', '0px'])
      vars.push(['--layout-size', 'calc(100% - calc(var(--layout-padding) * 2))'])

      for (const screen of screens) {
        if (prevScreen) {
          vars.push([`--layout-${prevScreen.name}-min`, `calc(calc(var(--layout-size) - ${screen.size}) / 2)`])
          vars.push([`--layout-${prevScreen.name}-max`, `calc(calc(${prevScreen.size} - ${screen.size}) / 2)`])
        } else {
          vars.push(['--layout-full', `1fr`])
        }

        prevScreen = screen
      }

      const screenNames = screens.map(({ name }) => name)
      const last = screenNames.pop()
      let gridTemplateColumns = '\n'

      gridTemplateColumns += '[_full-start] var(--layout-full)\n'

      for (const name of screenNames) {
        gridTemplateColumns += `[_${name}-start] min(var(--layout-${name}-min), var(--layout-${name}-max))\n`
      }

      gridTemplateColumns += `[_${last}-start] min(var(--layout-size), 480px)\n[_${last}-end]`

      for (const name of screenNames.reverse()) {
        gridTemplateColumns += ` min(var(--layout-${name}-min), var(--layout-${name}-max))\n[_${name}-end]`
      }

      gridTemplateColumns += ' var(--layout-full)\n[_full-end]'

      vars.push(['display', 'grid'])
      vars.push(['grid-template-columns', gridTemplateColumns])

      addUtilities({
        '.layout-container': Object.fromEntries(vars),
      })

      addUtilities({
        [`.layout-container > *`]: {
          'grid-column': `_full-start / _full-end`,
        },
      })

      addUtilities({
        [`.layout-contain`]: {
          'width': '100%',
          'margin-inline-start': 'auto',
          'margin-inline-end': 'auto',
        },
      })

      for (const { name, size } of [...screens].reverse()) {
        addUtilities({
          [`.layout-container > .layout-${name}`]: {
            '--layout-size': `calc(${size} - calc(var(--layout-padding) * 2))`,
            'grid-column': `_${name}-start / _${name}-end`,
          },
        })

        addUtilities({
          [`.layout-contain`]: {
            [`@media (min-width: ${size})`]: {
              'max-width': `min(var(--layout-size), calc(${size} - calc(var(--layout-padding) * 2)))`,
            },
          },
        })
      }

      const layoutPadding = { ...theme('layoutPadding') }
      const css = {
        '.layout-padding': {},
      }

      if ('DEFAULT' in layoutPadding) {
        css['.layout-padding']['--layout-padding'] = layoutPadding['DEFAULT']
        delete layoutPadding['DEFAULT']
      }

      for (const [breakpoint, padding] of Object.entries(layoutPadding)) {
        css['.layout-padding'][`@media (min-width: ${breakpoint})`] = {
          '--layout-padding': padding,
        }
      }

      addUtilities(css)
    },
    {
      theme: {
        layoutPadding: {
          'DEFAULT': '0.5rem',
          '480px': '1rem',
          '768px': '2rem',
          '1024px': '3rem',
        },
      },
    },
  )
}

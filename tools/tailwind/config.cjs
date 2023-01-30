const resolveConfig = require('tailwindcss/resolveConfig')
const tailwindConfig = require('../../tailwind.config.cjs')

module.exports = resolveConfig(tailwindConfig)

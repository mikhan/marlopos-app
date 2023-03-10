import adapter from '@sveltejs/adapter-auto'
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    postcss: true,
  }),
  kit: {
    adapter: adapter(),
    alias: {
      $core: 'src/core',
      $translations: 'src/translations',
      $tailwind: 'tools/tailwind/config.cjs',
    },
    csp: {
      mode: 'auto',
      directives: {
        'script-src': ['self', '*.tawk.to', 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
      },
    },
  },
}

export default config

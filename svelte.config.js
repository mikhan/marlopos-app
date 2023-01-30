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
      $tailwind: 'tools/tailwind/config.cjs',
    },
    csp: {
      mode: 'nonce',
      directives: {
        'script-src': ['self'],
      },
    },
  },
}

export default config

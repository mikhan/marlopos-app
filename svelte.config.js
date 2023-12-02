import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  vitePlugin: {
    inspector: true,
  },
  preprocess: sveltePreprocess({
    postcss: true,
  }),
  compilerOptions: {
    css: 'external',
  },
  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['/search/index.json', '/en/search/index.json'],
    },
    alias: {
      $core: 'src/core',
      $translations: 'src/translations',
    },
  },
}

export default config

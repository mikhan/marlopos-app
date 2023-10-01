import adapter from '@sveltejs/adapter-auto'
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    postcss: true,
  }),
  compilerOptions: {
    css: 'external',
  },
  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['/api/search/index.json'],
    },
    alias: {
      $core: 'src/core',
      $translations: 'src/translations',
      $tailwind: 'tools/tailwind/config.cjs',
    },
  },
}

export default config

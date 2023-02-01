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
      mode: 'auto',
      directives: {
        'script-src': ['self', '*.tawk.to', 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
        // 'style-src': ['self', '*.tawk.to', 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
        // 'frame-src': ['self', '*.tawk.to'],
        // 'font-src': ['self', '*.tawk.to', 'fonts.gstatic.com'],
        // 'img-src': ['self', '*.imagekit.io', '*.tawk.to', 'cdn.jsdelivr.net'],
        // 'connect-src': ['self', '*.tawk.to', 'wss://*.tawk.to'],
        // 'form-action': ['self', '*.tawk.to'],
      },
    },
  },
}

export default config

import svg from '@poppanator/sveltekit-svg'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    imagetools(),
    sveltekit(),
    svg({
      includePaths: ['./src/core/icons/', './src/lib/icons/'],
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
        ],
      },
    }),
  ],
})

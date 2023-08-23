import { sveltekit } from '@sveltejs/kit/vite'
import svg from '@poppanator/sveltekit-svg'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [
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
}

export default config

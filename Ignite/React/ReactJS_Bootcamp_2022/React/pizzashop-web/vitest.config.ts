import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  },
  resolve: {
    // vitest will resolve @ to the src folder
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})

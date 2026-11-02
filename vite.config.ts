import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/elena-buchelovskaya/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        readings: resolve(__dirname, 'readings/index.html'),
      },
    },
  },
})
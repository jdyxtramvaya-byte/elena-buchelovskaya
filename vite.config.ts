import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/elena-buchelovskaya/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        readings: 'readings/index.html',
      },
    },
  },
})
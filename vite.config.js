import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.js',
        coverage: {
          provider: 'v8',
          reporter: ['text', 'html']
        }
    },
  server: {
    proxy: {
      '/api': 'https://taskmernbackend-2e3b101e.b4a.run/',
    },
  }
})

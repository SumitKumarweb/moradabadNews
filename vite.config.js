import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/client',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor'
          }
          // Firebase chunk
          if (id.includes('firebase')) {
            return 'firebase'
          }
          // UI components chunk
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui'
          }
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom', 'react-router-dom', 'firebase', 'react-helmet-async'],
    target: 'node',
    format: 'esm'
  },
  server: {
    port: 3000,
    open: true,
  },
})


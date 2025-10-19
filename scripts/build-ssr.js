import { build } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import fs from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

async function buildSSR() {
  try {
    console.log('🚀 Building client assets...')
    
    // Build client assets
    await build({
      root,
      build: {
        outDir: 'dist/client',
        rollupOptions: {
          input: './index.html'
        }
      }
    })

    console.log('🚀 Building server bundle...')
    
    // Build server bundle
    await build({
      root,
      build: {
        ssr: true,
        outDir: 'dist/server',
        rollupOptions: {
          input: './src/entry-server.jsx'
        }
      }
    })

    console.log('✅ SSR build completed successfully!')
    console.log('📁 Client assets: dist/client/')
    console.log('📁 Server bundle: dist/server/')
    
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

buildSSR()

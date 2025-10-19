import { execSync } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

async function deploySSR() {
  try {
    console.log('🚀 Building SSR application...')
    
    // Build the SSR application
    execSync('npm run build:ssr', { stdio: 'inherit' })
    
    console.log('📦 Creating deployment package...')
    
    // Create deployment directory
    await fs.mkdir('ssr-deployment', { recursive: true })
    
    // Copy necessary files
    const filesToCopy = [
      'server.js',
      'package.json',
      'package-lock.json'
    ]
    
    for (const file of filesToCopy) {
      await fs.copyFile(file, `ssr-deployment/${file}`)
    }
    
    // Copy dist directory
    await fs.cp('dist', 'ssr-deployment/dist', { recursive: true })
    
    // Copy public assets
    await fs.cp('public', 'ssr-deployment/public', { recursive: true })
    
    // Create start script
    const startScript = `#!/bin/bash
npm install --production
NODE_ENV=production node server.js`
    
    await fs.writeFile('ssr-deployment/start.sh', startScript)
    await fs.chmod('ssr-deployment/start.sh', '755')
    
    // Create deployment archive
    execSync('tar -czf ssr-deployment.tar.gz -C ssr-deployment .', { stdio: 'inherit' })
    
    console.log('✅ SSR deployment package created: ssr-deployment.tar.gz')
    console.log('📁 Deployment directory: ssr-deployment/')
    console.log('🚀 To deploy:')
    console.log('   1. Upload ssr-deployment.tar.gz to your server')
    console.log('   2. Extract: tar -xzf ssr-deployment.tar.gz')
    console.log('   3. Run: ./start.sh')
    
  } catch (error) {
    console.error('❌ Deployment failed:', error)
    process.exit(1)
  }
}

deploySSR()

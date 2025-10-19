import { execSync } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

async function setupNetlify() {
  try {
    console.log('🚀 Setting up Netlify deployment...')
    
    // Check if git is initialized
    try {
      execSync('git status', { stdio: 'pipe' })
      console.log('✅ Git repository found')
    } catch (error) {
      console.log('📦 Initializing Git repository...')
      execSync('git init', { stdio: 'inherit' })
      execSync('git add .', { stdio: 'inherit' })
      execSync('git commit -m "Initial commit for Netlify deployment"', { stdio: 'inherit' })
    }
    
    // Create .gitignore if it doesn't exist
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.netlify/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
`
    
    try {
      await fs.access('.gitignore')
      console.log('✅ .gitignore already exists')
    } catch {
      await fs.writeFile('.gitignore', gitignoreContent)
      console.log('✅ Created .gitignore')
    }
    
    // Test build
    console.log('🔨 Testing build process...')
    execSync('npm run build', { stdio: 'inherit' })
    
    // Copy redirects
    console.log('📋 Setting up redirects...')
    execSync('cp _redirects dist/client/', { stdio: 'inherit' })
    
    console.log('✅ Netlify setup completed!')
    console.log('')
    console.log('📋 Next steps:')
    console.log('1. Create a GitHub repository')
    console.log('2. Push your code: git remote add origin <repo-url> && git push -u origin main')
    console.log('3. Connect to Netlify: https://app.netlify.com')
    console.log('4. Set build command: npm run build')
    console.log('5. Set publish directory: dist/client')
    console.log('')
    console.log('🚀 Your site will be automatically deployed!')
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    process.exit(1)
  }
}

setupNetlify()

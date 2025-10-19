# 🚀 Netlify Deployment Guide for Moradabad News

This guide will help you deploy your Moradabad News website to Netlify with automatic GitHub integration.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Node.js**: Version 18+ installed locally

## 🔧 Setup Steps

### 1. GitHub Repository Setup

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/moradabad-news.git
git branch -M main
git push -u origin main
```

### 2. Netlify Site Creation

#### Option A: Connect via Netlify Dashboard
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "New site from Git"
3. Choose "GitHub" and authorize
4. Select your repository: `moradabad-news`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/client`
   - **Node version**: `18`

#### Option B: Connect via CLI
```bash
# Login to Netlify
npx netlify login

# Initialize site
npx netlify init

# Deploy
npm run deploy:netlify:preview
```

### 3. Environment Variables

Set these in Netlify Dashboard → Site Settings → Environment Variables:

```env
NODE_ENV=production
VITE_APP_TITLE=Moradabad News
VITE_APP_DESCRIPTION=Latest News & Updates from Moradabad
VITE_APP_URL=https://your-site-name.netlify.app
```

### 4. Build Settings Configuration

In Netlify Dashboard → Site Settings → Build & Deploy:

- **Build command**: `npm run build`
- **Publish directory**: `dist/client`
- **Node version**: `18`
- **NPM version**: `9`

## 🚀 Deployment Options

### Automatic Deployment (Recommended)
- **Trigger**: Every push to `main` branch
- **Status**: Automatic via GitHub integration
- **Preview**: Every pull request gets a preview URL

### Manual Deployment
```bash
# Preview deployment
npm run deploy:netlify:preview

# Production deployment
npm run deploy:netlify:prod
```

## 📁 File Structure for Netlify

```
moradabad-news/
├── .github/workflows/deploy.yml    # GitHub Actions
├── netlify.toml                    # Netlify configuration
├── netlify/functions/ssr.js        # Serverless SSR function
├── _redirects                       # URL redirects
├── dist/client/                    # Built client files
└── package.json                    # Dependencies
```

## 🔧 Features Included

### ✅ Client-Side Rendering
- **React SPA**: Full client-side application
- **Hot Reload**: Development server with Vite
- **Asset Optimization**: Automatic code splitting
- **PWA Ready**: Service worker support

### ✅ Server-Side Rendering (SSR)
- **Netlify Functions**: Serverless SSR for dynamic pages
- **SEO Optimization**: Dynamic meta tags
- **Social Sharing**: Open Graph and Twitter cards
- **Performance**: Edge-cached responses

### ✅ SEO & Metadata
- **Dynamic Titles**: Unique titles for each page
- **Meta Descriptions**: SEO-optimized descriptions
- **Open Graph**: Social media sharing
- **Structured Data**: Rich snippets for search engines

## 🌐 URL Structure

### Client-Side Routes (SPA)
- `/` - Homepage
- `/about` - About page
- `/contact` - Contact page
- `/careers` - Careers page
- `/services` - Services page
- `/current-affairs` - Current affairs
- `/search` - Search page
- `/nimda/*` - Admin routes

### Server-Side Routes (SSR)
- `/news/category/slug` - Article pages with dynamic SEO
- `/news/category` - Category pages with dynamic SEO
- `/about` - Static pages with SEO
- `/contact` - Static pages with SEO

## 🚀 Deployment Commands

### Development
```bash
npm run dev              # Local development (client + server)
npm run dev:client       # Client only
npm run dev:server       # Server only
```

### Build
```bash
npm run build            # Build client assets
npm run build:ssr        # Build SSR bundle
```

### Deploy
```bash
npm run deploy:netlify:preview    # Preview deployment
npm run deploy:netlify:prod       # Production deployment
```

## 🔍 Monitoring & Analytics

### Netlify Analytics
- **Page Views**: Track visitor behavior
- **Performance**: Core Web Vitals
- **Errors**: Monitor deployment issues
- **Bandwidth**: Track usage

### GitHub Actions
- **Build Status**: Monitor deployment success
- **Preview URLs**: Test before production
- **Pull Request**: Automatic previews

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check Node version
   node --version  # Should be 18+
   
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **SSR Function Errors**
   ```bash
   # Check function logs in Netlify dashboard
   # Verify metadata service is working
   ```

3. **Asset Loading Issues**
   ```bash
   # Ensure _redirects file is copied
   npm run deploy:netlify
   ```

### Debug Commands
```bash
# Test local build
npm run build
npm run preview

# Test Netlify functions locally
npx netlify dev

# Check deployment status
npx netlify status
```

## 🎯 Production Checklist

- ✅ **GitHub Repository**: Code pushed to GitHub
- ✅ **Netlify Site**: Connected to GitHub
- ✅ **Environment Variables**: Set in Netlify dashboard
- ✅ **Build Settings**: Configured correctly
- ✅ **Custom Domain**: Set up (optional)
- ✅ **SSL Certificate**: Automatic with Netlify
- ✅ **Analytics**: Enabled (optional)

## 🚀 Go Live!

Once everything is set up:

1. **Push to GitHub**: `git push origin main`
2. **Automatic Deployment**: Netlify will build and deploy
3. **Live URL**: Your site will be available at `https://your-site-name.netlify.app`
4. **Custom Domain**: Add your domain in Netlify dashboard

## 📞 Support

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)

---

**Your Moradabad News website is now ready for automatic deployment! 🎉**

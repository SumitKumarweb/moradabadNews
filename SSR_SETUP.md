# Server-Side Rendering (SSR) Setup

This project now supports Server-Side Rendering with dynamic metadata generation for better SEO and performance.

## Features

- ✅ Dynamic metadata generation for all pages
- ✅ Structured data (JSON-LD) for articles and organization
- ✅ Open Graph and Twitter Card support
- ✅ Breadcrumb structured data
- ✅ Article-specific meta tags
- ✅ Canonical URLs
- ✅ SEO-optimized HTML generation

## Development

### Start SSR Development Server
```bash
npm run dev:ssr
```

### Build for Production
```bash
npm run build:ssr
```

### Preview Production Build
```bash
npm run preview:ssr
```

## Deployment

### Create Deployment Package
```bash
npm run deploy:ssr
```

This creates `ssr-deployment.tar.gz` with all necessary files.

### Deploy to Server
1. Upload `ssr-deployment.tar.gz` to your server
2. Extract: `tar -xzf ssr-deployment.tar.gz`
3. Run: `./start.sh`

## Dynamic Metadata

The system automatically generates metadata for:

### Article Pages (`/news/:category/:slug`)
- Dynamic title and description
- Article-specific Open Graph tags
- Structured data for news articles
- Breadcrumb navigation

### Category Pages (`/news/:category`)
- Category-specific titles and descriptions
- SEO-optimized meta tags

### Static Pages
- Home, About, Contact, Careers, Services, etc.
- Custom metadata for each page

## Metadata Service

The `MetadataService` class provides:

- `getArticleMetadata(category, slug, articleData)`
- `getCategoryMetadata(category)`
- `getPageMetadata(page)`
- `generateArticleStructuredData(articleData, category, slug)`
- `generateOrganizationStructuredData()`
- `generateBreadcrumbStructuredData(breadcrumbs)`

## Server Configuration

The server (`server.js`) handles:
- Dynamic HTML generation with metadata
- SSR rendering with React
- Static asset serving
- Compression and performance optimization

## File Structure

```
├── server.js                 # SSR server
├── src/
│   ├── entry-client.jsx     # Client-side hydration
│   ├── entry-server.jsx     # Server-side rendering
│   └── lib/
│       └── metadata-service.js # Dynamic metadata service
├── scripts/
│   ├── build-ssr.js         # SSR build script
│   └── deploy-ssr.js        # Deployment script
└── dist/                    # Build output
    ├── client/              # Client assets
    └── server/              # Server bundle
```

## Environment Variables

- `NODE_ENV=production` - Enables production mode
- `PORT=3000` - Server port (default: 3000)

## Performance Features

- Server-side rendering for faster initial load
- Dynamic metadata for better SEO
- Structured data for rich snippets
- Compression middleware
- Static asset optimization
- Critical resource preloading

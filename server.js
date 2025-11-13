import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

// Import routes
import apiRoutes from './src/ServerSide/routes/api.js';

// Import middleware
import { errorHandler } from './src/ServerSide/middleware/errorHandler.js';
import { requestLogger } from './src/ServerSide/middleware/requestLogger.js';

// Import utilities
import { generateHTML } from './src/ServerSide/utils/htmlTemplate.js';
import { getRouteMetadata, fetchArticleData, fetchCategoryData } from './src/ServerSide/utils/routeMetadata.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Routes (must be before static file serving)
app.use('/api', apiRoutes);

// Health check endpoint (before static files)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Determine static files directory
// Vite builds to 'public_html' by default (see vite.config.js)
const staticDir = join(__dirname, 'public_html');

// Serve static files (CSS, JS, images, etc.)
// Set index: false to prevent express.static from serving index.html automatically
// This allows our dynamic HTML middleware to handle all HTML requests
app.use(express.static(staticDir, { index: false }));

// Serve dynamic HTML for all non-API routes (client-side routing)
// This must be after static file serving but before 404 handler
// Use app.use() instead of app.get('*') for Express 5 compatibility
// express.static will handle static files first, then call next() for non-static files
app.use(async (req, res, next) => {
  // Skip API routes and health check
  if (req.path.startsWith('/api') || req.path === '/health') {
    return next();
  }
  
  // Only handle GET requests for HTML pages
  if (req.method !== 'GET') {
    return next();
  }
  
  // Skip static file extensions (already handled by express.static)
  const staticExtensions = ['.js', '.jsx', '.mjs', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.json', '.xml', '.webmanifest', '.map'];
  const hasStaticExtension = staticExtensions.some(ext => req.path.toLowerCase().endsWith(ext));
  if (hasStaticExtension) {
    return next();
  }
  
  // Skip paths that are clearly static assets
  const staticPaths = ['/src/', '/assets/', '/node_modules/', '/@vite/', '/@react-refresh'];
  const isStaticPath = staticPaths.some(path => req.path.startsWith(path));
  if (isStaticPath) {
    return next();
  }
  
  // Check if the requested file exists in static directory (let express.static handle it)
  const staticFilePath = join(staticDir, req.path);
  if (existsSync(staticFilePath)) {
    try {
      const stats = statSync(staticFilePath);
      if (stats.isFile()) {
        return next(); // Let express.static serve the file
      }
    } catch (err) {
      // Ignore errors, continue to dynamic HTML generation
    }
  }
  
  try {
    // Get route metadata (now async - fetches article data for article pages)
    let metadata = await getRouteMetadata(req);
    
    // For article pages, metadata is already fetched in getRouteMetadata
    // Just log it for debugging
    if (metadata.pageType === 'article') {
      console.log(`✅ Article metadata loaded:`);
      console.log(`   Title: ${metadata.title?.substring(0, 60)}...`);
      console.log(`   Description: ${metadata.description?.substring(0, 60)}...`);
      console.log(`   Image: ${metadata.image}`);
      console.log(`   Keywords: ${metadata.keywords?.substring(0, 60)}...`);
    }
    
    // Fetch category data for category pages
    if (metadata.pageType === 'category' && metadata.params?.category) {
      const categoryData = await fetchCategoryData(metadata.params.category);
      if (categoryData) {
        metadata = {
          ...metadata,
          ...categoryData
        };
      }
    }
    
    // Generate dynamic HTML with metadata
    const html = generateHTML(metadata);
    
    // Send HTML response
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error generating dynamic HTML:', error);
    // Fallback to static index.html if dynamic generation fails
    const indexPath = join(staticDir, 'index.html');
    if (existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next(error);
    }
  }
});

// Catch 404 for API routes only
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({
      error: 'Not Found',
      message: `API route ${req.method} ${req.path} not found`
    });
  } else {
    // For non-API routes, this shouldn't be reached due to * route above
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method} ${req.path} not found`
    });
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
let server;

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  // Don't exit immediately, let the server try to handle it
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  // Don't exit immediately
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  }
});

process.on('SIGINT', () => {
  console.log('\n📴 SIGINT received, shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

// Start server
server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
  console.log(`📁 Serving static files from: ${staticDir}`);
  console.log(`\n💡 Press Ctrl+C to stop the server\n`);
  
  // Check if build exists
  const indexPath = join(staticDir, 'index.html');
  if (!existsSync(indexPath)) {
    console.warn(`⚠️  Warning: ${indexPath} not found.`);
    console.warn(`   Please run "npm run build" to build the client-side application.`);
  } else {
    console.log(`✅ Frontend build found and ready to serve.`);
  }
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
  }
});

export default app;


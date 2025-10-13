# Moradabad News - Vite React JavaScript

A modern news website built with React, Vite, and Firebase - converted from Next.js TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Create Hostinger deployment package
npm run deploy:build
```

## 📁 Project Structure

```
moradabad-news-vite/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # UI components (buttons, cards, etc.)
│   │   ├── admin/          # Admin-specific components
│   │   ├── SiteHeader.jsx
│   │   ├── SiteFooter.jsx
│   │   └── theme-provider.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── ArticlePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── admin/          # Admin pages
│   ├── lib/                # Utilities and services
│   │   ├── firebase.js     # Firebase configuration
│   │   ├── firebase-service.js  # Firebase operations
│   │   └── utils.js        # Helper functions
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies

```

## ✨ Features

- ✅ **Pure React + JavaScript** (No TypeScript)
- ✅ **Client-Side Routing** (React Router v6)
- ✅ **Firebase Integration** (Firestore, Auth, Storage)
- ✅ **Tailwind CSS** for styling
- ✅ **Dark Mode** support
- ✅ **Responsive Design**
- ✅ **Admin Panel** for content management
- ✅ **Static Build** for Hostinger deployment

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **React Router 6** - Client-side routing
- **Firebase** - Backend & database
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
```

### Firebase Configuration

Edit `src/lib/firebase.js` with your Firebase credentials.

## 📦 Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Deployment to Hostinger

```bash
# Build and create deployment package
npm run deploy:build
```

This creates `hostinger-deployment.tar.gz` ready for upload.

**Steps:**
1. Login to Hostinger hPanel
2. Go to File Manager → `public_html`
3. Upload `hostinger-deployment.tar.gz`
4. Extract the file
5. Add `.htaccess` for routing (see below)

### .htaccess Configuration

Create `.htaccess` in `public_html`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

This enables client-side routing.

## 🚦 Routes

### Public Routes
- `/` - Homepage
- `/about` - About page
- `/careers` - Careers
- `/contact` - Contact
- `/current-affairs` - Current affairs
- `/news/trending` - Trending news
- `/news/:category` - Category page (moradabad, up, india, global)
- `/news/:category/:id` - Article detail

### Admin Routes
- `/nimda` - Admin login
- `/nimda/dashboard` - Dashboard
- `/nimda/posts` - Manage posts
- `/nimda/categories` - Manage categories
- `/nimda/careers` - Manage job postings
- `/nimda/applications` - View applications
- `/nimda/messages` - View messages
- `/nimda/headers` - Manage header banners
- `/nimda/videos` - Manage videos
- `/nimda/quiz` - Manage quiz
- `/nimda/settings` - Site settings

## 🔄 Migration from Next.js

This project was migrated from Next.js TypeScript to Vite React JavaScript.

**Key Changes:**
- ❌ Removed TypeScript types
- ❌ Removed Next.js server components
- ❌ Removed `generateMetadata` functions
- ✅ Added React Router for routing
- ✅ Converted all components to client-side
- ✅ Updated imports (no 'next/*' imports)
- ✅ Replaced Next.js `<Image>` with `<img>`
- ✅ Replaced Next.js `<Link>` with React Router `<Link>`

See `MIGRATION_GUIDE.md` for detailed conversion process.

## 📝 Development Guide

### Adding a New Page

1. Create component in `src/pages/`:
```javascript
// src/pages/NewPage.jsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  )
}
```

2. Add route in `src/App.jsx`:
```javascript
import NewPage from './pages/NewPage'

<Route path="/new-page" element={<NewPage />} />
```

### Adding a Component

Create in `src/components/`:
```javascript
// src/components/MyComponent.jsx
export function MyComponent({ title }) {
  return <div>{title}</div>
}
```

### Firebase Operations

Use functions from `src/lib/firebase-service.js`:
```javascript
import { getFeaturedArticles, getArticleById } from '../lib/firebase-service'

// In component
const articles = await getFeaturedArticles()
const article = await getArticleById(id)
```

## 🎨 Styling

### Tailwind CSS

Use Tailwind utility classes:
```jsx
<div className="flex items-center gap-4 p-6 bg-card rounded-lg">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

### Custom Classes

Defined in `src/index.css`:
```css
@layer utilities {
  .custom-class {
    /* ... */
  }
}
```

## 🐛 Debugging

### Development Server Issues

```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Build Issues

```bash
# Clean build
rm -rf dist
npm run build
```

## 📊 Performance

- **Build Time**: ~3-5 seconds (Vite is fast!)
- **Bundle Size**: Optimized with code splitting
- **First Load**: < 200KB (main bundle)

## 🔐 Admin Authentication

Uses localStorage for simple authentication:

```javascript
// Login
localStorage.setItem('adminAuth', 'true')

// Logout
localStorage.removeItem('adminAuth')

// Check auth
const isAdmin = localStorage.getItem('adminAuth') === 'true'
```

**Note:** For production, implement proper Firebase Authentication.

## 📚 Documentation

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Follow the existing code structure
2. Remove all TypeScript types
3. Use functional components
4. Use React Hooks (useState, useEffect, etc.)
5. Keep components small and reusable

## 📄 License

Private project for Moradabad News.

## 🆘 Support

For issues or questions about the conversion, refer to `MIGRATION_GUIDE.md`.

---

**Built with ❤️ using Vite + React**


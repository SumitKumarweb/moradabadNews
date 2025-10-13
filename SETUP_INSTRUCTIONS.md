# Setup Instructions - Moradabad News Vite Project

## 🎯 Current Status

✅ **Project Foundation Complete** (20% of total work)

The Vite React JavaScript project structure is ready. You now need to convert the remaining Next.js components to complete the migration.

## 📦 What You Have

```
✅ Vite configuration
✅ React Router setup
✅ Firebase configuration (JavaScript)
✅ Tailwind CSS setup
✅ Theme provider
✅ Utility functions
✅ Example pages (HomePage, NotFoundPage)
✅ Complete documentation
✅ Build scripts
```

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd /Users/rahulkumar90270/Downloads/moradabad-news-vite
npm install
```

### Step 2: Review Documentation

1. Read `README.md` - Project overview
2. Read `MIGRATION_GUIDE.md` - Conversion patterns
3. Read `CONVERSION_SUMMARY.md` - Progress tracking

### Step 3: Start Converting

Begin with the critical path files (see priority list below).

## 📋 Priority Conversion List

### 🔴 Critical (Do These First)

These files are required for the app to run:

1. **`src/lib/firebase-service.js`** ⚠️ REQUIRED
   - Copy from: `lib/firebase-service.ts`
   - Remove all TypeScript types
   - Keep all Firebase functions

2. **`src/components/ui/toaster.jsx`** ⚠️ REQUIRED
   - Copy from: `components/ui/toaster.tsx`
   - Needed for toast notifications

3. **`src/components/ui/toast.jsx`** ⚠️ REQUIRED
   - Copy from: `components/ui/toast.tsx`

4. **`src/hooks/use-toast.js`** ⚠️ REQUIRED
   - Copy from: `hooks/use-toast.ts`

5. **`src/components/SiteHeader.jsx`** ⚠️ REQUIRED
   - Copy from: `components/site-header.tsx`
   - Replace Next.js Link → React Router Link

6. **`src/components/SiteFooter.jsx`** ⚠️ REQUIRED
   - Copy from: `components/site-footer.tsx`

### 🟡 Important (Do These Next)

7. **UI Components** (button, card, input, etc.)
8. **NewsCard component**
9. **HeroSection component**
10. **Other page components**

## 🛠️ Conversion Template

For each file, follow this pattern:

```javascript
// 1. Update imports
import { useState, useEffect } from 'react'  // ✅ React hooks
import { Link, useNavigate } from 'react-router-dom'  // ✅ React Router
// ❌ Remove: import Link from 'next/link'
// ❌ Remove: import { useRouter } from 'next/navigation'

// 2. Remove TypeScript
// ❌ Remove: interface Props { ... }
// ❌ Remove: type User = { ... }
// ❌ Remove: React.FC<Props>

// 3. Convert component
function MyComponent({ title, items }) {  // ✅ Plain JavaScript
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  
  // Component logic (same as before)
  
  return (
    <div>
      <Link to="/path">Link</Link>  {/* ✅ React Router Link */}
      <img src="/image.jpg" alt="..." />  {/* ✅ Regular img tag */}
    </div>
  )
}

export default MyComponent
```

## 📝 File Conversion Checklist

When converting each file:

```markdown
## Converting: [filename]

- [ ] Copied file from Next.js project
- [ ] Removed all `import type` statements
- [ ] Removed all `interface` declarations
- [ ] Removed all `type` declarations
- [ ] Removed `: Type` annotations from parameters
- [ ] Removed `: Type` annotations from variables
- [ ] Removed `Promise<Type>` from async functions
- [ ] Replaced `React.FC<Props>` with function
- [ ] Replaced Next.js `Link` with React Router `Link`
- [ ] Replaced `href` with `to` in Links
- [ ] Replaced Next.js `Image` with `<img>`
- [ ] Replaced `useRouter()` with `useNavigate()`
- [ ] Replaced `router.push()` with `navigate()`
- [ ] Replaced `usePathname()` with `useLocation()`
- [ ] Removed `"use client"` if unnecessary
- [ ] Converted server component to client component (if applicable)
- [ ] Updated file extension from `.tsx` to `.jsx` or `.ts` to `.js`
- [ ] Tested component in dev mode
```

## 🧪 Testing as You Go

After converting a few files:

```bash
# Start dev server
npm run dev

# Open browser to http://localhost:3000
# Fix any errors that appear
```

Common errors:
- **Module not found**: File hasn't been converted yet
- **Unexpected token**: Leftover TypeScript syntax
- **Invalid hook call**: Incorrect React Hook usage

## 📂 Folder Structure to Create

Create these folders as needed:

```bash
mkdir -p src/components/ui
mkdir -p src/components/admin
mkdir -p src/pages/admin
mkdir -p src/hooks
mkdir -p src/lib
```

## 💡 Tips

1. **Start Simple**: Convert smaller utility files first
2. **Copy-Paste**: Start by copying the Next.js file, then modify
3. **Use Find & Replace**: 
   - Find: `: string` → Replace: (empty)
   - Find: `: number` → Replace: (empty)
   - Find: `import type` → Replace: (delete line)
4. **Test Often**: Run `npm run dev` after converting a few files
5. **Reference Examples**: Look at the example files already created

## 🎯 Minimum Viable Product

To get the app running with basic functionality, you need AT MINIMUM:

```
✅ src/lib/firebase-service.js
✅ src/hooks/use-toast.js
✅ src/components/ui/toast.jsx
✅ src/components/ui/toaster.jsx
✅ src/components/SiteHeader.jsx
✅ src/components/SiteFooter.jsx
✅ src/components/NewsCard.jsx (if used in HomePage)
✅ src/components/HeroSection.jsx (if used in HomePage)
```

These 8 files will allow the homepage to render.

## 🚀 Deployment (After Conversion)

Once conversion is complete:

```bash
# Build
npm run build

# Create deployment package
npm run deploy:build

# Upload hostinger-deployment.tar.gz to Hostinger
```

## 📚 Reference Documents

- `README.md` - Project documentation
- `MIGRATION_GUIDE.md` - Detailed conversion guide
- `CONVERSION_SUMMARY.md` - Progress tracking
- Example files in `src/` - Templates

## ⏱️ Time Estimate

- Critical files (1-6): **2-3 hours**
- Important files (7-10): **2-3 hours**
- Remaining files: **10-15 hours**

**Total**: 15-20 hours for complete conversion

## 🆘 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: The file hasn't been converted yet. Create it following the template.

### Issue: "Unexpected token"
**Solution**: Leftover TypeScript syntax. Remove all type annotations.

### Issue: "Invalid hook call"
**Solution**: Make sure component starts with capital letter and hooks are inside functional component.

### Issue: Build errors
**Solution**: Check vite.config.js path aliases are correct.

## 📞 Next Steps

1. Install dependencies: `npm install`
2. Start with firebase-service.js conversion
3. Convert UI components one by one
4. Test frequently
5. Build when complete

## ✅ Success Criteria

The conversion is complete when:
- [ ] `npm run dev` starts without errors
- [ ] Homepage loads correctly
- [ ] Navigation works between pages
- [ ] Firebase data loads
- [ ] Admin login works
- [ ] `npm run build` succeeds
- [ ] No console errors in browser

---

**Good luck with the conversion!** 🚀

Refer to the migration guide for detailed patterns and examples.


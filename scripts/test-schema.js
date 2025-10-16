#!/usr/bin/env node

// Schema testing utility for Moradabad News
// This script tests the structured data and provides validation

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sample article data for testing
const sampleArticle = {
  title: 'Breaking News: मुरादाबाद में बड़ी खबर',
  summary: 'Latest breaking news from Moradabad with important updates',
  content: 'Full article content here...',
  category: 'moradabad',
  author: 'Moradabad News Team',
  publishedAt: '2025-01-10T10:30:00Z',
  modifiedAt: '2025-01-10T10:30:00Z',
  image: '/images/articles/breaking-news.jpg',
  tags: ['breaking', 'moradabad', 'news']
}

// Generate test structured data
function generateTestStructuredData() {
  const baseUrl = 'https://moradabadnews.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": sampleArticle.title,
    "description": sampleArticle.summary,
    "image": `${baseUrl}${sampleArticle.image}`,
    "author": {
      "@type": "Person",
      "name": sampleArticle.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moradabad News",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.svg`,
        "width": 200,
        "height": 60
      }
    },
    "datePublished": sampleArticle.publishedAt,
    "dateModified": sampleArticle.modifiedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/news/moradabad/breaking-news-मरदबद-म-बड-खबर`
    },
    "articleSection": sampleArticle.category,
    "keywords": sampleArticle.tags.join(', ')
  }
}

// Generate organization schema
function generateOrganizationSchema() {
  const baseUrl = 'https://moradabadnews.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Moradabad News",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.svg`,
      "width": 200,
      "height": 60
    },
    "description": "Get the latest news from Moradabad, Uttar Pradesh, India and around the world.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Moradabad",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@moradabadnews.com"
    },
    "sameAs": [
      "https://twitter.com/moradabadnews",
      "https://facebook.com/moradabadnews"
    ]
  }
}

// Generate website schema
function generateWebsiteSchema() {
  const baseUrl = 'https://moradabadnews.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Moradabad News",
    "url": baseUrl,
    "description": "Get the latest news from Moradabad, Uttar Pradesh, India and around the world.",
    "publisher": {
      "@type": "Organization",
      "name": "Moradabad News",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.svg`,
        "width": 200,
        "height": 60
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
}

// Generate breadcrumb schema
function generateBreadcrumbSchema() {
  const baseUrl = 'https://moradabadnews.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Moradabad News",
        "item": `${baseUrl}/news/moradabad`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Breaking News: मुरादाबाद में बड़ी खबर",
        "item": `${baseUrl}/news/moradabad/breaking-news-मरदबद-म-बड-खबर`
      }
    ]
  }
}

// Test schema validation
function testSchema() {
  console.log('🧪 Testing Schema Markup...')
  console.log('================================')
  
  const schemas = {
    'Article Schema': generateTestStructuredData(),
    'Organization Schema': generateOrganizationSchema(),
    'Website Schema': generateWebsiteSchema(),
    'Breadcrumb Schema': generateBreadcrumbSchema()
  }
  
  Object.entries(schemas).forEach(([name, schema]) => {
    console.log(`\n📋 ${name}:`)
    console.log(JSON.stringify(schema, null, 2))
    
    // Basic validation
    const requiredFields = {
      '@context': schema['@context'],
      '@type': schema['@type']
    }
    
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key)
    
    if (missingFields.length === 0) {
      console.log('✅ Schema structure is valid')
    } else {
      console.log(`❌ Missing required fields: ${missingFields.join(', ')}`)
    }
  })
  
  return schemas
}

// Generate test HTML with schema
function generateTestHTML(schemas) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schema Test - Moradabad News</title>
  <meta name="description" content="Testing structured data for Moradabad News">
  
  <!-- Schema Markup -->
  ${Object.values(schemas).map(schema => 
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  ).join('\n  ')}
</head>
<body>
  <h1>Schema Test Page</h1>
  <p>This page contains test structured data for validation.</p>
  
  <h2>Test URLs:</h2>
  <ul>
    <li><a href="https://search.google.com/test/rich-results">Google Rich Results Test</a></li>
    <li><a href="https://validator.schema.org/">Schema.org Validator</a></li>
    <li><a href="https://developers.facebook.com/tools/debug/">Facebook Sharing Debugger</a></li>
    <li><a href="https://cards-dev.twitter.com/validator">Twitter Card Validator</a></li>
  </ul>
</body>
</html>`
  
  return html
}

// Main execution
function main() {
  try {
    console.log('🚀 Starting Schema Testing...')
    
    // Test schemas
    const schemas = testSchema()
    
    // Generate test HTML
    const testHTML = generateTestHTML(schemas)
    
    // Write test HTML
    const publicDir = path.join(__dirname, '..', 'public')
    const testPath = path.join(publicDir, 'schema-test.html')
    
    fs.writeFileSync(testPath, testHTML, 'utf8')
    console.log(`\n✅ Test HTML generated: ${testPath}`)
    
    console.log('\n🎉 Schema testing completed!')
    console.log('\n📋 Next Steps:')
    console.log('1. Open schema-test.html in browser')
    console.log('2. Test with Google Rich Results Test')
    console.log('3. Validate with Schema.org Validator')
    console.log('4. Check Facebook and Twitter sharing')
    
  } catch (error) {
    console.error('❌ Error testing schema:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export {
  generateTestStructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema
}

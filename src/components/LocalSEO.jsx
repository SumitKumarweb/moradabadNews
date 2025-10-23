import { Helmet } from 'react-helmet-async'

export default function LocalSEO({ 
  businessName = "Moradabad News",
  businessType = "News Website",
  address = {
    street: "Moradabad",
    city: "Moradabad",
    state: "Uttar Pradesh",
    postalCode: "244001",
    country: "India"
  },
  contact = {
    phone: "+91-XXXX-XXXXXX",
    email: "contact@moradabads.com",
    website: "https://moradabads.com"
  },
  coordinates = {
    latitude: 28.8381,
    longitude: 78.7733
  },
  openingHours = [
    { day: "Monday", open: "00:00", close: "23:59" },
    { day: "Tuesday", open: "00:00", close: "23:59" },
    { day: "Wednesday", open: "00:00", close: "23:59" },
    { day: "Thursday", open: "00:00", close: "23:59" },
    { day: "Friday", open: "00:00", close: "23:59" },
    { day: "Saturday", open: "00:00", close: "23:59" },
    { day: "Sunday", open: "00:00", close: "23:59" }
  ],
  socialProfiles = [
    "https://facebook.com/moradabadnews",
    "https://twitter.com/moradabadnews",
    "https://instagram.com/moradabadnews",
    "https://youtube.com/moradabadnews"
  ],
  services = [
    "Local News",
    "Breaking News",
    "Current Affairs",
    "Weather Updates",
    "Traffic Updates",
    "Business News",
    "Sports News",
    "Education News"
  ],
  areaServed = [
    "Moradabad",
    "Rampur",
    "Bareilly",
    "Meerut",
    "Ghaziabad",
    "Noida",
    "Delhi",
    "Uttar Pradesh"
  ]
}) {
  // Generate LocalBusiness structured data
  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "description": `Get the latest news from ${address.city}, ${address.state}, India. Stay updated with breaking news, current affairs, and local updates.`,
    "url": contact.website,
    "telephone": contact.phone,
    "email": contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.street,
      "addressLocality": address.city,
      "addressRegion": address.state,
      "postalCode": address.postalCode,
      "addressCountry": address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coordinates.latitude,
      "longitude": coordinates.longitude
    },
    "openingHoursSpecification": openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": `https://schema.org/${hours.day}`,
      "opens": hours.open,
      "closes": hours.close
    })),
    "sameAs": socialProfiles,
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": coordinates.latitude,
        "longitude": coordinates.longitude
      },
      "geoRadius": "50000"
    },
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "News Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        },
        "position": index + 1
      }))
    },
    "logo": {
      "@type": "ImageObject",
      "url": "https://moradabads.com/logo.svg",
      "width": 200,
      "height": 60
    },
    "image": "https://moradabads.com/logo.svg"
  }

  // Generate NewsMediaOrganization structured data
  const newsMediaStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": businessName,
    "url": contact.website,
    "logo": {
      "@type": "ImageObject",
      "url": "https://moradabads.com/logo.svg",
      "width": 200,
      "height": 60
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": address.city,
      "addressRegion": address.state,
      "addressCountry": address.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": contact.phone,
      "email": contact.email
    },
    "sameAs": socialProfiles,
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "publishingPrinciples": "https://moradabads.com/editorial-guidelines",
    "ethicsPolicy": "https://moradabads.com/ethics-policy",
    "correctionsPolicy": "https://moradabads.com/corrections-policy"
  }

  // Generate Place structured data
  const placeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${businessName} - ${address.city}`,
    "description": `Local news source for ${address.city}, ${address.state}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": address.city,
      "addressRegion": address.state,
      "addressCountry": address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coordinates.latitude,
      "longitude": coordinates.longitude
    },
    "url": contact.website
  }

  return (
    <Helmet>
      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content={address.city} />
      <meta name="geo.position" content={`${coordinates.latitude};${coordinates.longitude}`} />
      <meta name="ICBM" content={`${coordinates.latitude}, ${coordinates.longitude}`} />
      
      {/* Business-specific meta tags */}
      <meta name="business:contact_data:street_address" content={address.street} />
      <meta name="business:contact_data:locality" content={address.city} />
      <meta name="business:contact_data:region" content={address.state} />
      <meta name="business:contact_data:postal_code" content={address.postalCode} />
      <meta name="business:contact_data:country_name" content={address.country} />
      <meta name="business:contact_data:website" content={contact.website} />
      <meta name="business:contact_data:phone_number" content={contact.phone} />
      <meta name="business:contact_data:email" content={contact.email} />
      
      {/* Local business hours */}
      <meta name="business:hours:day" content="Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday" />
      <meta name="business:hours:start" content="00:00" />
      <meta name="business:hours:end" content="23:59" />
      
      {/* Service area */}
      <meta name="business:service_area" content={areaServed.join(', ')} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessStructuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(newsMediaStructuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(placeStructuredData)}
      </script>
    </Helmet>
  )
}
import{j as e}from"./ui-DWSvR_GU.js";import{H as v}from"./index-D3EJN4dI.js";import{r as w}from"./react-vendor-BC7D1Za-.js";import"./firebase-D6ihfNk5.js";function T({preloadImages:c=[],preloadFonts:l=[],preloadScripts:f=[],criticalCSS:s="",lazyLoadImages:a=!0,enableWebP:m=!0,enableAVIF:g=!0}){w.useEffect(()=>{if(a&&typeof window<"u"){const n=document.querySelectorAll("img[data-src]"),t=new IntersectionObserver((o,j)=>{o.forEach(i=>{if(i.isIntersecting){const r=i.target;r.src=r.dataset.src,r.classList.remove("lazy"),j.unobserve(r)}})});n.forEach(o=>t.observe(o))}},[a]);const p=()=>{const n=[];return c.forEach(t=>{n.push(e.jsx("link",{rel:"preload",as:"image",href:t,type:t.includes(".webp")?"image/webp":t.includes(".avif")?"image/avif":"image/jpeg"},`preload-image-${t}`))}),l.forEach(t=>{n.push(e.jsx("link",{rel:"preload",as:"font",href:t,type:"font/woff2",crossOrigin:"anonymous"},`preload-font-${t}`))}),f.forEach(t=>{n.push(e.jsx("link",{rel:"preload",as:"script",href:t},`preload-script-${t}`))}),n},d=()=>e.jsxs(e.Fragment,{children:[e.jsx("link",{rel:"dns-prefetch",href:"//fonts.googleapis.com"}),e.jsx("link",{rel:"dns-prefetch",href:"//fonts.gstatic.com"}),e.jsx("link",{rel:"dns-prefetch",href:"//www.google-analytics.com"}),e.jsx("link",{rel:"dns-prefetch",href:"//pagead2.googlesyndication.com"}),e.jsx("link",{rel:"dns-prefetch",href:"//www.googletagmanager.com"}),e.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),e.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),e.jsx("link",{rel:"preconnect",href:"https://www.googletagmanager.com"}),e.jsx("link",{rel:"preconnect",href:"https://pagead2.googlesyndication.com"}),e.jsx("link",{rel:"prefetch",href:"/trending"}),e.jsx("link",{rel:"prefetch",href:"/current-affairs"})]}),u=()=>e.jsxs(e.Fragment,{children:[e.jsx("meta",{name:"format-detection",content:"telephone=no"}),e.jsx("meta",{name:"mobile-web-app-capable",content:"yes"}),e.jsx("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),e.jsx("meta",{name:"apple-mobile-web-app-status-bar-style",content:"default"}),e.jsx("meta",{name:"renderer",content:"webkit"}),e.jsx("meta",{name:"force-rendering",content:"webkit"}),m&&e.jsx("meta",{name:"image-format",content:"webp"}),g&&e.jsx("meta",{name:"image-format",content:"avif"}),e.jsx("meta",{name:"performance-budget",content:"lcp:2.5s,cls:0.1,fid:100ms"})]}),y=()=>s?e.jsx("style",{dangerouslySetInnerHTML:{__html:s}}):null,h=()=>typeof window>"u"?null:e.jsx("script",{dangerouslySetInnerHTML:{__html:`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                  console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                  console.log('SW registration failed: ', registrationError);
                });
            });
          }
        `}}),x=()=>typeof window>"u"?null:e.jsx("script",{dangerouslySetInnerHTML:{__html:`
          // Core Web Vitals monitoring
          function sendToAnalytics(metric) {
            if (typeof gtag !== 'undefined') {
              gtag('event', metric.name, {
                event_category: 'Web Vitals',
                event_label: metric.id,
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                non_interaction: true,
              });
            }
          }
          
          // LCP monitoring
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              sendToAnalytics({ name: 'LCP', value: entry.startTime, id: entry.id });
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          // FID monitoring
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              sendToAnalytics({ name: 'FID', value: entry.processingStart - entry.startTime, id: entry.id });
            }
          }).observe({ entryTypes: ['first-input'] });
          
          // CLS monitoring
          let clsValue = 0;
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                sendToAnalytics({ name: 'CLS', value: clsValue, id: entry.id });
              }
            }
          }).observe({ entryTypes: ['layout-shift'] });
        `}});return e.jsxs(v,{children:[u(),d(),p(),y(),h(),x(),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, viewport-fit=cover"}),e.jsx("meta",{name:"theme-color",content:"#1e40af"}),e.jsx("meta",{name:"msapplication-TileColor",content:"#1e40af"}),e.jsx("meta",{name:"image-optimization",content:"lazy-loading,webp,avif"}),e.jsx("link",{rel:"preload",href:"/fonts/inter-var.woff2",as:"font",type:"font/woff2",crossOrigin:"anonymous"}),e.jsx("link",{rel:"preload",href:"/logo.svg",as:"image",type:"image/svg+xml"}),e.jsx("link",{rel:"preload",href:"/favicon.ico",as:"image",type:"image/x-icon"})]})}export{T as default};

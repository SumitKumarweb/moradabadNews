import { useState, useRef, useEffect } from 'react'

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/placeholder.jpg',
  loading = 'lazy',
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [imageRef, setImageRef] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    let observer
    if (imageRef && loading === 'lazy') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '50px 0px', // Start loading 50px before image comes into view
          threshold: 0.1
        }
      )
      observer.observe(imageRef)
    } else if (loading === 'eager') {
      setIsInView(true)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [imageRef, loading])

  useEffect(() => {
    if (isInView && src) {
      const img = new Image()
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      img.onerror = () => {
        // Fallback to placeholder if image fails to load
        setImageSrc(placeholder)
        setIsLoaded(true)
      }
      img.src = src
    }
  }, [isInView, src, placeholder])

  return (
    <div 
      ref={setImageRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

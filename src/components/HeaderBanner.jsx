import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { getActiveHeaderBanners } from "@/lib/firebase-service"
import { Button } from "@/components/ui/button"

export function HeaderBanner({ banners: initialBanners }) {
  const [banners, setBanners] = useState(initialBanners || [])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!initialBanners || initialBanners.length === 0) {
      const loadBanners = async () => {
        const activeBanners = await getActiveHeaderBanners()
        setBanners(activeBanners)
      }
      loadBanners()
    }
  }, [initialBanners])

  if (!banners || banners.length === 0 || !isVisible) {
    return null
  }

  const banner = banners[0]

  return (
    <div
      className="sticky top-0 z-[60] w-full py-3 px-4 border-b"
      style={{
        backgroundColor: banner.backgroundColor || '#f0f0f0',
        color: banner.textColor || '#000',
      }}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div
          className="prose prose-sm max-w-none flex-1 [&>*]:my-0"
          style={{ color: banner.textColor || '#000' }}
          dangerouslySetInnerHTML={{ __html: banner.content }}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="shrink-0 hover:bg-black/10"
          style={{ color: banner.textColor || '#000' }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


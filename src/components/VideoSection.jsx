import { Play } from "lucide-react"

export function VideoSection({ video }) {
  if (!video) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Play className="h-6 w-6 text-red-600" />
        <h2 className="font-serif text-3xl font-bold text-foreground">Featured Video</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-foreground">{video.title}</h3>
          <p className="text-lg leading-relaxed text-muted-foreground">{video.description}</p>
        </div>
      </div>
    </div>
  )
}


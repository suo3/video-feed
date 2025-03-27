import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

 interface Video {
  id: number
  description: string
  thumbnail_url: string
  video_url: string
  created_at: string
  category_id: number
  featured: boolean
  cat_slug: string
  title: string
} 

interface FeaturedVideosProps {
  videos: Video[]
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Featured Videos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col">
            <Link href={`/video/${video.title.toLowerCase().replace(/\s+/g, "-")}`} className="group">
              <div className="relative aspect-video mb-3 overflow-hidden">
                <Image
                  src={video.thumbnail_url || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-30 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
              </div>

              <h3 className={`text-center font-medium`}>
                {video.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}


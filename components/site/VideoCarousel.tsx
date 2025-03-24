'use client'
import { useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import YouTubePlayer from "./YoutubePlayer"
import FeaturedVideoHeader from "./featuredVideoHeader"

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
/* interface Video {
  id: number
  title: string
  thumbnailUrl: string
  youtubeUrl: string
} */

/*  const videos: Video[] = [
  {
    id: 1,
    title: "Rick Astley - Never Gonna Give You Up",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "TED Talk - The Power of Vulnerability",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
    youtubeUrl: "https://www.youtube.com/watch?v=iCvmsMzlF7o",
  },
  {
    id: 3,
    title: "SpaceX Starship Launch",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
    youtubeUrl: "https://www.youtube.com/watch?v=C0F2E-PRm44",
  },
]  */



export default  function   VideoCarousel({ videos }: { videos: Video[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cinemaMode, setCinemaMode] = useState<string | null>(null)

  const handleSlideChange = () => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap())
    }
  }

  const enterCinemaMode = (youtubeUrl: string) => {
    setCinemaMode(youtubeUrl)
  }

  const exitCinemaMode = () => {
    setCinemaMode(null)
  }

  //const currentVideo = videos[currentIndex]

  return (
    <div className="flex justify-center  w-full bg-black min-h-[500px]">
    <div className="relative w-full max-w-5xl mx-auto">
      <Carousel ref={emblaRef} onSlideChange={handleSlideChange} className="w-full">
        <CarouselContent>
          {videos.map((video) => (
       
            <CarouselItem key={video.id}>
              <Card className="border-none">
                <CardContent className="p-0 relative aspect-video">
                  <Image
                    src={video.thumbnail_url || "/placeholder.svg"}
                    alt={video.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                    <h3 className="text-white text-xl font-bold mb-4 text-center px-4">{video.title}</h3>
                    <button
                      onClick={() => enterCinemaMode(video.thumbnail_url)}
                      className="p-2 bg-white bg-opacity-90 rounded-full text-black hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                      aria-label={`Play ${video.title} in cinema mode`}
                    >
                      <PlayCircle className="w-12 h-12" />
                    </button>
                  </div>
                </CardContent>
                  <FeaturedVideoHeader 
             category={video.cat_slug} 
             title={video.title} 
             author="Samuel Osseo-Asare"
             date={video.created_at} 
             commentCount={0}
             onCinemaMode={() => enterCinemaMode(video.thumbnail_url)}
             />
              </Card>
           
            </CarouselItem>
             
            
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>

      <div className="flex justify-center mt-4">
        {videos.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
          />
        ))}
      </div>

      {cinemaMode && <YouTubePlayer youtubeUrl={cinemaMode} onClose={exitCinemaMode} />}
    </div></div>
  )
}


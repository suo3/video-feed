"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import YouTubePlayer from "./YoutubePlayer";
import FeaturedVideoHeader from "./FeaturedVideoHeader";

interface Video {
  id: number;
  description: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
  category_id: number;
  featured: boolean;
  cat_slug: string;
  title: string;
}

export default function VideoCarousel({ videos }: { videos: Video[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cinemaMode, setCinemaMode] = useState<string | null>(null);

  const handleSlideChange = () => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    }
  };

  const enterCinemaMode = (youtubeUrl: string) => {
    setCinemaMode(youtubeUrl);
  };

  const exitCinemaMode = () => {
    setCinemaMode(null);
  };

  //const currentVideo = videos[currentIndex]

  return (
    <div className="flex justify-center  w-full bg-black min-h-[500px]">
      <div className="relative w-full max-w-5xl mx-auto">
        <Carousel
          ref={emblaRef}
          onSlideChange={handleSlideChange}
          className="w-full"
        >
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id}>
                <Card className="border-none w-full">
                  <CardContent className="p-0 relative w-full h-[500px] aspect-vidkeo">
                    <Image
                      src={video.thumbnail_url || "/placeholder.svg"}
                      alt={video.title}
                      layout="fill"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                      <h3 className="text-white text-xl font-bold mb-4 text-center px-4">
                        {video.title}
                      </h3>
                      <button
                        onClick={() => enterCinemaMode(video.thumbnail_url)}
                        className="p-2 bg-white bg-opacity-90 rounded-full text-black hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        aria-label={`Play ${video.title} in cinema mode`}
                      >
                        <PlayCircle className="w-12 h-12" />
                      </button>
                    </div>
                  </CardContent>
                  {/* <FeaturedVideoHeader
                    category={video.cat_slug}
                    title={video.title}
                    author="Samuel Osseo-Asare"
                    date={video.created_at}
                    commentCount={0}
                    onCinemaMode={() => enterCinemaMode(video.thumbnail_url)}
                  /> */}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>

        {cinemaMode && (
          <YouTubePlayer youtubeUrl={cinemaMode} onClose={exitCinemaMode} />
        )}
      </div>
    </div>
  );
}

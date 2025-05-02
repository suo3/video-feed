"use client";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import SingleVideoCard from "./SingleVideoCard";

interface Video {
  id: string;
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

  return (
    <div className="flex justify-center  w-full bg-black min-h-auto py-5">
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
                  <CardContent className="p-0 relative w-full h-full aspect-video items-center justify-center">
                    <SingleVideoCard
                      description={video.description}
                      date={video.created_at.split("T")[0]}
                      id={video.id}
                      title={video.title}
                      category={video.cat_slug}
                      video_url={video.video_url}
                      slug={video.title}
                      thumbnail={video.thumbnail_url}
                      hideVideoContent={true}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}

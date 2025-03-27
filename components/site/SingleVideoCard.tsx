'use client';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import YouTubePlayer from './YoutubePlayer';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  video_url: string;
  category: string;
  slug: string;
  size?: 'small' | 'medium' | 'large';
  showCategory?: boolean;
}

export default function SingleVideoCard({
  id,
  title,
  thumbnail,
  category,
  video_url,
  slug,
  size = 'medium',
  showCategory = true,
}: VideoCardProps) {

    const [cinemaMode, setCinemaMode] = useState<string | null>(null)
  const sizeClasses = {
    small: {
      container: 'h-44',
      titleSize: 'text-sm font-medium line-clamp-2',
    },
    medium: {
      container: 'h-52',
      titleSize: 'text-base font-medium line-clamp-2',
    },
    large: {
      container: 'h-64 md:h-80',
      titleSize: 'text-lg md:text-xl font-bold line-clamp-3',
    },
  };

  const exitCinemaMode = () => {
    setCinemaMode(null)
  }

  return (
    <>
    <Card className="rounded-none border-0 overflow-hidden bg-transparent">
      <CardContent className="p-0">
      
          <div className="relative w-full overflow-hidden group">
         
              <div onClick={() => setCinemaMode(video_url)} className="relative aspect-video cursor-pointer bg-gray-900 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div  className="w-20 h-20 rounded-full bg-white bg-opacity-75 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <Play className="h-8 w-8 text-black" />
                </div>
              </div>
              <Image
                src={thumbnail}
                alt={title}
                
                fill
               
                className=" height-auto  opacity-90 object-cover transition-transform duration-300 group-hover:scale-105"
              />
             
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-75 flex items-center justify-center">
                  <Play className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>
           
          </div>
     
       
      </CardContent>
    </Card>
     {cinemaMode && <YouTubePlayer  youtubeUrl={cinemaMode} onClose={exitCinemaMode} />} </>
  );
}

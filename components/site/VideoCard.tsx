'use client';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function VideoCard({
  id,
  title,
  thumbnail,
  category,
  video_url,
  slug,
  size = 'medium',
  showCategory = true,
}: VideoCardProps) {
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

  return (
    <Card className="rounded-none border-0 overflow-hidden bg-transparent">
      <CardContent className="p-0">
        <Link href={`/video/${slug}`} className="block">
          <div className="relative w-full overflow-hidden group">
            <div
              className={`relative w-full ${sizeClasses[size].container} overflow-hidden`}
            >
              <Image
                src={thumbnail}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-75 flex items-center justify-center">
                  <Play className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h3 className={sizeClasses[size].titleSize}>{title}</h3>
              {showCategory && (
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className="rounded-sm text-xs text-purple-600 border-purple-600 hover:bg-purple-50"
                  >
                    {category}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </Link>
      
      </CardContent>
    </Card>
  );
}

"use client";

import React from "react";
import { useState } from "react";
import VideoCard from "@/components/site/VideoCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Video {
  id: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
  category_id: string;
  featured: boolean;
  cat_slug: string;
  video_slug: string;
  title: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}
export default function AllVideos({
  categories,
  videos,
}: {
  categories: Category[];
  videos: Video[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredVideos = selectedCategory
    ? videos.filter((video) => video.category_id === selectedCategory)
    : videos;

  console.log(selectedCategory);
  return (
    <div className="dark:bg-black border-b border-b-foreground/10 min-h-screen bg-white">
      <div className="dark:bg-black border-b border-b-foreground/10  bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            All Videos
          </h1>
          <p className="dark:text-white text-gray-600 text-center max-w-2xl mx-auto">
            Explore our entire collection of videos from different categories
          </p>
        </div>
      </div>

      <div className="dark:bg-black  w-full  mx-auto px-4 py-8">
        <div className="container">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium">Filter by:</span>
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          {/* <Separator className="mb-8" /> */}

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <Link key={video.id} href={`/video/${video.video_slug}`}>
                  <VideoCard
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail_url}
                    category={video.cat_slug}
                    slug={video.video_slug}
                    video_url={video.video_url}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No videos found for this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

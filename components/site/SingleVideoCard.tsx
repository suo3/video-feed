"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Calendar, Fullscreen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import YouTubePlayer from "./YoutubePlayer";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  video_url: string;
  category: string;
  description: string;
  date: string;
  slug: string;
  size?: "small" | "medium" | "large";
  showCategory?: boolean;
  hideVideoContent?: boolean;
}

export default function SingleVideoCard({
  title,
  category,
  video_url,
  date,
  description,
  hideVideoContent = false,
}: VideoCardProps) {
  const [cinemaMode, setCinemaMode] = useState<string | null>(null);

  const exitCinemaMode = () => {
    setCinemaMode(null);
  };

  const handleBookmarkClick = () => {
    const url = window.location.href;
    const title = document.title;
    if ("navigator" in window && "share" in navigator) {
      navigator.share({
        title: title,
        url: url,
      });
    } else if ("addToHomescreen" in window) {
      (window.addToHomescreen as () => void)();
    } else {
      alert(`Press Ctrl+D (or Cmd+D on a Mac) to bookmark this page`);
    }
  };
  return (
    <>
      <Card className="rounded-none border-0 overflow-hidden bg-transparent">
        <CardContent className="p-0">
          <div className="relative w-full overflow-hidden group">
            <div
              onClick={() => setCinemaMode(video_url)}
              className="relative aspect-video cursor-pointer bg-gray-900 mb-4"
            >
              <iframe
                width="100%"
                height="100%"
                src={video_url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              <div
                style={{ display: hideVideoContent ? "none" : "block" }}
                className="relative max-w-[60px] inset-0 bg-white bg-opacity-30 flex items-center justify-center"
              >
                <div className="w-12 h-12   flex items-center justify-center">
                  <Fullscreen className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>
          </div>

          <div hidden={hideVideoContent} className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
              </div>
              <span>•</span>
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                onClick={() => {
                  handleBookmarkClick();
                }}
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            <Separator className="mb-6" />

            <div>
              <Badge
                variant="outline"
                className="rounded-sm text-xs text-purple-600 border-purple-600 hover:bg-purple-50 mb-4"
              >
                {category}
              </Badge>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {cinemaMode && (
        <YouTubePlayer youtubeUrl={cinemaMode} onClose={exitCinemaMode} />
      )}{" "}
    </>
  );
}

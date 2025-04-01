import { useState } from "react";
import VideoCard from "@/components/site/VideoCard";
import { Badge } from "@/components/ui/badge";
import AllVideos from "@/components/site/AllVideos";
import { getAllVideos, getCategories } from "../actions";

export default async function VideosPage() {
  const { categories } = await getCategories();
  const { videos } = await getAllVideos();

  return (
    <div className="min-h-screen bg-white">
      <AllVideos categories={categories} videos={videos} />
    </div>
  );
}

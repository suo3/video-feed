'use server'
import VideoFeedLogo from "./video-feed-logo";
import { getFeaturedVideos } from "@/app/actions";

interface Video {
  id:number;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
  category_id: number;
  featured: boolean;
}
export default async function Header({ videos }: { videos: Video[] })  {
const { featuredVideos } = await getFeaturedVideos();


  return (
    <div className="flex text-white flex-col gap-16 items-center">
     <h1>TEST</h1>
     </div>
  );
}

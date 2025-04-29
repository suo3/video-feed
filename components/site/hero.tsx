import { getFeaturedVideos } from "@/app/actions";

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
  category_id: number;
  featured: boolean;
}
export default async function Hero() {
  const { featuredVideos } = await getFeaturedVideos();

  let indx =
    featuredVideos.length === 1
      ? 0
      : Math.floor(Math.random() * featuredVideos.length);
  return (
    <div className="flex justify-center  w-full bg-gray-900 min-h-[500px]"></div>
  );
}

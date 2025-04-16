import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { getAllVideos } from "@/app/actions";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  daysAgo: number;
  readTime: number;
  hasPlayButton?: boolean;
}

export default async function LatestVideos() {
  const { videos } = await getAllVideos();
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">LATEST VIDEOS</h2>

      <div className="space-y-6">
        {videos.slice(0, 5).map((video) => (
          <div
            key={video.id}
            className="flex flex-col md:flex-row gap-4 border-b pb-6"
          >
            <div className="relative w-full md:w-[440px] h-[247px]">
              <Link href={`/video/${video.video_slug}`} className="pointer ">
                <Image
                  src={video.thumbnail_url || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover "
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 rounded-full p-2">
                    <Play className="h-8 w-8 text-black" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex-1">
              <div className="inline-block mb-2">
                <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-md">
                  {video.cat_slug}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">
                <Link
                  href={`/video/${video.video_slug}`}
                  className="hover:underline capitalize"
                >
                  {video.title}
                </Link>
              </h3>

              <p className="text-gray-600 mb-3">{video.description}</p>

              <div className="flex items-center text-sm text-gray-500">
                <span>{video.created_at.split("T")[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href={`/videos`} className="hover:underline capitalize">
          <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition-colors">
            LOAD MORE
          </button>
        </Link>
      </div>
    </section>
  );
}

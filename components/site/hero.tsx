
import { getFeaturedVideos } from "@/app/actions";
import VideoCarousel from "./VideoCarousel";
import {YouTubeEmbed} from '@next/third-parties/google';

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
export default async function Hero()  {
const { featuredVideos } = await getFeaturedVideos();



let indx = featuredVideos.length === 1 ? 0: Math.floor(Math.random() * featuredVideos.length);
  return (
   
     <div className="flex justify-center  w-full bg-gray-900 min-h-[500px]">
             {/*  <VideoCarousel /> */}
          
                {/*  <div   key={featuredVideos[indx].id}>
                 <YouTubeEmbed videoid={featuredVideos[indx].video_url} height={500}   /> 
                   <iframe src={featuredVideos[indx].video_url} width="100%" height="500" allowFullScreen ></iframe>
                   <h1 className="text-white">{featuredVideos[indx].title}</h1>
                  <p className="text-white">{featuredVideos[indx].description}</p>
                </div> */}
         
         
     </div>
  );
}

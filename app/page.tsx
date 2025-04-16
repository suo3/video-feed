import Hero from "@/components/site/hero";
import VlogSubscription from "@/components/site/Subscription";
import VideoCarousel from "@/components/site/VideoCarousel";
import { getFeaturedVideos } from "@/app/actions";
import FeaturedVideos from "@/components/site/FeauredVideos";
import LatestVideos from "@/components/site/LatestVideos";

export default async function Home() {
  const { featuredVideos: videos } = await getFeaturedVideos();
  return (
    <>
      {/*  <Hero  /> */}
      <VideoCarousel videos={videos} />
      <main className="flex-1 flex flex-col gap-6 px-0">
        <FeaturedVideos videos={videos} />
        <VlogSubscription />
        <LatestVideos />
      </main>
    </>
  );
}

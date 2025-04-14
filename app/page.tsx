import Hero from "@/components/site/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import VideoCarousel from "@/components/site/VideoCarousel";
import { getFeaturedVideos } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import FeaturedVideos from "@/components/site/FeauredVideos";

export default async function Home() {
  const { featuredVideos: videos } = await getFeaturedVideos();
  return (
    <>
      {/*  <Hero  /> */}
      <VideoCarousel videos={videos} />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <FeaturedVideos videos={videos} />

        {/*  <h2 className="font-medium text-xl mb-4">Next steps s</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
      </main>
    </>
  );
}

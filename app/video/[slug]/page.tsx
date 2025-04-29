import VideoCard from "@/components/site/VideoCard";
import { getSingleVideo } from "@/app/actions";
import { getAllVideos } from "@/app/actions";
import SingleVideoCard from "@/components/site/SingleVideoCard";
import CommentSection from "@/components/site/CommentSection";

export default async function VideoDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { video } = await getSingleVideo(slug);
  const { videos } = await getAllVideos();

  const relatedVideos = videos
    .filter((v) => v.category_id === video.category_id && v.id !== video.id)
    .slice(0, 3);

  if (!video) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
          <p>
            The video you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-black dark:border-b border-b-foreground/10 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SingleVideoCard
              description={video.description}
              date={video.created_at.split("T")[0]}
              id={video.id}
              title={video.title}
              category={video.cat_slug}
              video_url={video.video_url}
              slug={video.title}
              thumbnail={video.thumbnail_url}
            />

            <div className="mt-10">
              <CommentSection />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.length > 0 ? (
                relatedVideos.map((relatedVideo) => (
                  <VideoCard
                    key={relatedVideo.id}
                    id={relatedVideo.id}
                    video_url={relatedVideo.video_url}
                    title={relatedVideo.title}
                    thumbnail={relatedVideo.thumbnail_url}
                    category={relatedVideo.cat_slug}
                    slug={relatedVideo.cat_slug}
                    size="small"
                  />
                ))
              ) : (
                <p className="text-gray-500">No related videos found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

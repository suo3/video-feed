import { getCategoryVideosAction } from "@/app/actions";
import VideoCard from "@/components/site/VideoCard";
import { getAllVideos } from "@/app/actions";

async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;

  console.log(slug);
  const { categoryVideos, categoryName } = await getCategoryVideosAction(slug);
  const { videos } = await getAllVideos();

  const renderedVideos = slug === "all-videos" ? videos : categoryVideos;
  return (
    <div className="mx-auto p-0  min-h-screen w-full">
      <div className="bg-gray-50 py-10 w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {slug === "all-videos"
              ? "Category"
              : (categoryName[0]?.name ?? "Category")}{" "}
            Videos
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our collection of{" "}
            {slug === "all-videos"
              ? "category"
              : categoryName[0]?.name.toLowerCase()}{" "}
            videos, featuring amazing content from creators around the world.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderedVideos && categoryVideos.length > 0 ? (
            categoryVideos.map((video) => (
              <div key={video.id} className="border rounded-lg p-4">
                <VideoCard
                  id={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail_url}
                  category={categoryName[0].name}
                  video_url={video.video_url}
                  slug={video.video_slug}
                />
              </div>
            ))
          ) : (
            <p>No videos found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;

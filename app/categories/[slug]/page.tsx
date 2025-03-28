
import { getCategoryVideosAction } from "@/app/actions";
import VideoCard from "@/components/site/VideoCard";

async function CategoryPage  (props:{params: Promise<{slug: string}>} )  {
const params = await props.params;
const slug = params.slug;


console.log(slug)
const { categoryVideos, categoryName } = await getCategoryVideosAction(slug);


  return (


    <div className="container mx-auto p-4">
     <h1 className="text-3xl font-bold mb-4">{categoryName[0].name}</h1>
      {categoryName[0].description && <p className="text-gray-600 mb-6">{categoryName[0].description}</p>}

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryVideos && categoryVideos.length > 0 ? (
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

  );
}

export default CategoryPage;
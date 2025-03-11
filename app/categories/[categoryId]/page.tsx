
import { getVideosAction } from "@/app/actions";


async function CategoryPage  (props:{params: Promise<{categoryId: string}>} )  {
const params = await props.params;
const categoryId = params.categoryId;
console.log(categoryId)
const { videos, categories, categoryVideos, categoryName } = await getVideosAction(categoryId);

console.log('categoryName', categoryName)
console.log('categoryVideos', categoryVideos)
console.log(videos)
  return (


    <div className="container mx-auto p-4">
     <h1 className="text-3xl font-bold mb-4">{categoryName[0].name}</h1>
      {categoryName[0].description && <p className="text-gray-600 mb-6">{categoryName[0].description}</p>}

  <pre>{JSON.stringify(videos, null, 2)}</pre> 
   <pre>{JSON.stringify(categories, null, 2)}</pre>  
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos && videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="border rounded-lg p-4">
              {video.thumbnail_url && (
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{video.title}</h2>
              {video.description && <p className="text-gray-500">{video.description}</p>}
              <a
                href={video.video_url}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Watch Video
              </a>
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
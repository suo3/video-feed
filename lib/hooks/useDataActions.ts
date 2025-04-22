/* 
import { getVideosAction } from '@/app/actions'
import { useParams } from 'next/navigation';

const useDataActions = async () => {
  const params = useParams();
  const categoryId = params.categoryId;

  const { videos, categories } = await getVideosAction();

  const filteredVideos = videos.filter((video) => video.category_id === categoryId);

  console.log(filteredVideos);
  console.log(categories);

  return { videos: filteredVideos, categories };
}

export default useDataActions; */

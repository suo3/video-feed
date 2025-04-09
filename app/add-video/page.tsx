import { getCategories, addVideoAction } from "../actions";
import AddVideo from "@/components/site/AddVideo";

interface VideoFormData {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  isFeatured: boolean;
  videoUrl: string;
}
export default async function AddVideoPage({
  formData,
}: {
  formData: VideoFormData;
}) {
  const { categories } = await getCategories();
  console.log(formData);

  const handleAddVideo = async () => {
    await addVideoAction(formData);
  };

  return <AddVideo categories={categories} /* addVideo={handleAddVideo()} */ />;
}

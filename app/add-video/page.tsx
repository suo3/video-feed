import { getCategories } from "../actions";
import AddVideo from "@/components/site/AddVideo";

interface VideoFormData {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  isFeatured: boolean;
  videoUrl: string;
}
export default async function AddVideoPage() {
  const { categories } = await getCategories();

  return <AddVideo categories={categories} />;
}

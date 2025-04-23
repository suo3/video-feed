import { getCategories } from "../actions";
import AddVideo from "@/components/site/AddVideo";

export default async function AddVideoPage() {
  const { categories } = await getCategories();

  return <AddVideo categories={categories} />;
}

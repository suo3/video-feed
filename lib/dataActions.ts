'use client';
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";




export async function getCategoryVideosAction() {
  const supabase = await createClient();
  const params = await useParams();
  const categoryId = params.categoryId ? params.categoryId.toString() : '';
  const {data:category, error:categoryError} = await supabase
  .from('categories')
  .select('id, name, description')
  .eq('id', categoryId)
  .single();

  if(categoryError || !category) {
    notFound();
    console.error(categoryError);
  }

  const {data:videos, error: videosError} = await supabase
  .from('videos')
  .select('id, title, description, thumbnail_url, video_url, created_at')
  .eq('category_id', categoryId)
  .order('created_at',{ascending:false})

  if(videosError) {
    notFound();
    console.error(videosError);
  }

  return {category, videos};
}
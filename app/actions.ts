"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export async function getCategoryVideosAction(slug?: string) {
  try {
    const supabase = await createClient();
    // get videos for each category
    const { data: categoryVideos, error: categoryVideosError } = await supabase
      .from("videos")
      .select(
        "id, title, description, thumbnail_url, video_url, created_at, category_id, featured, cat_slug, video_slug"
      )
      .eq("cat_slug", slug);

    if (categoryVideosError) {
      throw categoryVideosError;
    }

    // get category name
    const { data: categoryName, error: categoryNameError } = await supabase
      .from("categories")
      .select("name, description")
      .eq("slug", slug);

    if (categoryNameError) {
      throw categoryNameError;
    }

    return { categoryVideos, categoryName };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getCategories() {
  try {
    const supabase = await createClient();

    // get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name, description, slug");

    if (categoriesError) {
      throw categoriesError;
    }

    return { categories };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

//get all featured videos
export async function getFeaturedVideos() {
  try {
    const supabase = await createClient();

    const { data: featuredVideos, error: featuredVideosError } = await supabase
      .from("videos")
      .select(
        "id, title, description, thumbnail_url, video_url, video_slug, created_at, category_id, featured, cat_slug"
      )
      .eq("featured", true);

    if (featuredVideosError) {
      throw featuredVideosError;
    }

    return { featuredVideos };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

//get single video
export async function getSingleVideo(slug: string) {
  try {
    const supabase = await createClient();

    const { data: video, error: videoError } = await supabase
      .from("videos")
      .select(
        "id, title, description, thumbnail_url,  video_url, created_at, category_id, featured, cat_slug, video_slug"
      )
      .eq("video_slug", slug)
      .single();

    if (videoError) {
      throw videoError;
    }

    return { video };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

//get all videos
export async function getAllVideos() {
  try {
    const supabase = await createClient();

    const { data: videos, error: videosError } = await supabase
      .from("videos")
      .select(
        "id, title, description, thumbnail_url, video_url, created_at, category_id, featured, cat_slug,  video_slug"
      );

    if (videosError) {
      throw videosError;
    }

    return { videos };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

//add a new video
export async function addVideoAction(formData: FormData) {
  try {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase.from("videos").insert({
        title: formData.title,
        description: formData.description,
        thumbnail_url: formData.thumbnail_url,
        video_url: formData.video_url,
        category_id: formData.category_id,
        featured: formData.featured,
        cat_slug: formData.cat_slug,
        user_id: user.data.user?.id,
      });

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
    } else {
      console.log("not logged in");
    }
  } catch (error) {
    console.error("Error adding video:", error);
    notFound();
  }
}

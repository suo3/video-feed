import Link from "next/link";
import { getCategories } from "../../app/actions";
import VideoFeedLogo from "@/components/video-feed-logo";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

export const NavBar = async () => {
  const { categories } = await getCategories();

  return (
    <div className="container mx-auto px-4 py-4 flex justify-between align-center items-center">
      <div className="flex gap-5 items-center font-semibold">
        <Link href={"/"}>
          <VideoFeedLogo />
        </Link>
      </div>
      <div className="hidden md:block">
        {categories.map((category) => (
          <Link
            key={category.name}
            className="titlecase mr-3 font-semibold hover:underline"
            href={`/categories/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
        <Link
          //className="uppercase mr-3 font-semibold hover:underline"
          className={cn(
            "text-sm font-medium px-3 py-1.5 mx-1 transition-colors"
          )}
          href="/videos"
        >
          All Videos
        </Link>
      </div>
      <div className="hidden md:block">
        {" "}
        <Link
          href="/add-video"
          className="block py-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          <span className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Video
          </span>
        </Link>
      </div>
      <div className="hidden md:block">
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </div>
    </div>
  );
};

import Link from "next/link";
import { getCategories } from "../../app/actions";
import VideoFeedLogo from "@/components/video-feed-logo";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { PlusCircle, X, Menu } from "lucide-react";

export const NavBar = async () => {
  const { categories } = await getCategories();

  return (
    <div className="container mx-auto px-4 py-4 flex justify-between align-center items-center">
      <div className="flex gap-5 items-center font-semibold">
        <Link href={"/"}>
          <VideoFeedLogo />
        </Link>
      </div>
      <div className="hidden md:flex">
        {categories.map((category) => (
          <Link
            key={category.name}
            className="dark:text-white capitalize mr-3 text-gray-900 text-base font-medium hover:text-purple-600 transition-colors"
            href={`/categories/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
        <Link
          className="dark:text-white capitalize mr-3 text-gray-900 text-base font-medium hover:text-purple-600 transition-colors"
          href="/videos"
        >
          All Videos
        </Link>

        <Link
          href="/add-video"
          className=" font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          <span className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-1 text-base text-purple-600 font-medium" />
            Add Video
          </span>
        </Link>
      </div>

      <div className="flexitems-center ">
        <div className="hidden md:flex">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </div>
      </div>
      <MobileMenu categories={categories}>
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </MobileMenu>
    </div>
  );
};

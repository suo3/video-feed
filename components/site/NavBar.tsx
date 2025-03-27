
import Link from 'next/link'
import { getCategories } from '../../app/actions';
import VideoFeedLogo from "@/components/video-feed-logo";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export const NavBar = async () => {
  const { categories } = await getCategories();

  return (
      <div className="container mx-auto px-4 py-4 flex justify-between align-center items-center">
    <div className="flex gap-5 items-center font-semibold">
      <Link href={"/"}>
        <VideoFeedLogo />
      </Link>         
    </div>
    <div>
      {categories.map((category) => (
        <Link key={category.name} className="uppercase mr-3 font-semibold hover:underline" href={`/categories/${category.slug}`}>
          {category.name}
        </Link>
      ))}
    </div>
     {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
    </div>
  )
}
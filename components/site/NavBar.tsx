
import Link from 'next/link'
import { getCategories } from '../../app/actions';
import VideoFeedLogo from "@/components/video-feed-logo";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export const NavBar = async () => {
  const { categories } = await getCategories();

  return (
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
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
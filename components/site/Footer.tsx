import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";
import {
  getCategories,
  getFeaturedVideos,
  getAllVideos,
} from "../../app/actions";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}
export const Footer = async () => {
  const { categories } = await getCategories();
  const { featuredVideos } = await getFeaturedVideos();
  const { videos } = await getAllVideos();
  return (
    <footer className="bg-slate-800 text-white w-full">
      <div className="container   mx-auto px-0 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="w-full max-w-5xl container ps-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-red-500">V</span>
              <span className="text-2xl font-bold text-white">LOG</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Vlog is a modern vlogging platform that is dedicated to beautiful
              videos from around the world. Our mission is to share impactful
              stories through video content.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="w-full max-w-5xl container ps-2">
            <h3 className="text-lg font-semibold mb-4">Most Viewed</h3>
            <ul className="space-y-2">
              {videos.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/video/most-viewed-${item}`}
                    className="text-sm text-gray-300 hover:text-white hover:underline flex items-start"
                  >
                    <span className="text-red-500 mr-2">•</span>
                    <span className="capitalize">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-5xl container ps-2">
            <h3 className="text-lg font-semibold mb-4">Featured Videos</h3>
            <ul className="space-y-2">
              {featuredVideos.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/video/${item.video_slug}`}
                    className="text-sm text-gray-300 hover:text-white hover:underline flex items-start"
                  >
                    <span className="text-red-500 capitalize mr-2">•</span>
                    <span className="capitalize">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-5xl container ps-2">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.name.toLowerCase()}`}
                    className="text-sm text-gray-300 hover:text-white hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row  justify-between">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} VLOG. All rights reserved. Created by
            Samuel O-A
          </p>
        </div>
      </div>
      <ThemeSwitcher />
    </footer>
  );
};

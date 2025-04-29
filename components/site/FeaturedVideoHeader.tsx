"use client";

import { Maximize } from "lucide-react";
import Link from "next/link";

interface FeaturedVideoHeaderProps {
  category: string;
  title: string;
  author: string;
  date: string;
  commentCount: number;
  onWatchLater?: () => void;
  onCinemaMode?: () => void;
}

export default function FeaturedVideoHeader({
  category,
  title,
  author,
  date,
  commentCount,
  onWatchLater,
  onCinemaMode,
}: FeaturedVideoHeaderProps) {
  return (
    <div className="w-full  bottom-0 bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-4">
          <Link href={`/category/${category.toLowerCase()}`}>
            <span className="uppercase text-purple-500 text-sm tracking-wider font-medium text-slate-300">
              {category}
            </span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {title}
          </h1>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-slate-300">
              <Link
                href={`/author/${author.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="hover:text-white text-purple-500 transition-colors">
                  {author}
                </span>
              </Link>
              <span className="mx-2">/</span>
              <span>{date.split("T")[0]}</span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={onCinemaMode}
                className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Maximize size={18} />
                <span>CINEMA MODE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

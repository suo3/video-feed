"use client"

import { MessageSquare, Monitor, Maximize } from "lucide-react"
import Link from "next/link"

interface FeaturedVideoHeaderProps {
  category: string
  title: string
  author: string
  date: string
  commentCount: number
  onWatchLater?: () => void
  onCinemaMode?: () => void
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
    <div className="w-full fixed bottom-0 bg-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-4">
          <Link href={`/category/${category.toLowerCase()}`}>
            <span className="uppercase text-sm tracking-wider font-medium text-slate-300">{category}</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h1>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-slate-300">
              <Link href={`/author/${author.toLowerCase().replace(/\s+/g, "-")}`}>
                <span className="hover:text-white transition-colors">{author}</span>
              </Link>
              <span className="mx-2">/</span>
              <span>{date}</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="#comments"
                className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <MessageSquare size={18} />
                <span>{commentCount} COMMENTS</span>
              </Link>

              {/* <button
                onClick={onWatchLater}
                className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Monitor size={18} />
                <span>WATCH LATER</span>
              </button> */}

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
  )
}


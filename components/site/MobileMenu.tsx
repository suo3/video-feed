"use client";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export const MobileMenu = ({
  categories,
  children,
}: {
  categories: Category[];
  children: React.ReactNode;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="dark:text-white block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu
              className="dark:text-white block h-6 w-6"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="dark:bg-black dark:text-white md:hidden absolute h-full z-10 left-0 mt-3 w-full bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/categories/${cat.slug}`}
                className="dark:text-white capitalize mr-3 text-gray-900 hover:text-purple-600 block px-2 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              className="dark:text-purple-600capitalize ps-2 mt-5  mb-3 mr-3 text-gray-900 text-base font-medium hover:text-purple-600 transition-colors"
              href="/videos"
            >
              All Videos
            </Link>
            <Link
              href="/add-video"
              className="flex items-center text-purple-600 hover:text-purple-800 px-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Video
            </Link>

            <div className="border-t px-2 pt-2 mt-2">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

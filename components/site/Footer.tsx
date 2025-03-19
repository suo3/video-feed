'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { ThemeSwitcher } from '../theme-switcher';
export const  Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="   mx-auto px-4 py-10">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="w-full max-w-5xl container">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-red-500">V</span>
              <span className="text-2xl font-bold text-white">LOG</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Vlog is a modern vlogging platform that is dedicated to beautiful videos from around the world. Our mission is to share impactful stories through video content.
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

          <div>
            <h3 className="text-lg font-semibold mb-4">Most Viewed</h3>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map((item) => (
                <li key={item}>
                  <Link
                    href={`/video/most-viewed-${item}`}
                    className="text-sm text-gray-300 hover:text-white hover:underline flex items-start"
                  >
                    <span className="text-red-500 mr-2">•</span>
                    <span>Beautiful cinematic film techniques that everyone should know</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Most Discussed</h3>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map((item) => (
                <li key={item}>
                  <Link
                    href={`/video/most-discussed-${item}`}
                    className="text-sm text-gray-300 hover:text-white hover:underline flex items-start"
                  >
                    <span className="text-red-500 mr-2">•</span>
                    <span>What makes aerial photography and timelapses so beautiful</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="grid grid-cols-2 gap-2">
              {['Travel', 'Nature', 'Arts', 'Technology', 'People', 'Architecture', 'Food', 'Lifestyle'].map(
                (category) => (
                  <li key={category}>
                    <Link
                      href={`/category/${category.toLowerCase()}`}
                      className="text-sm text-gray-300 hover:text-white hover:underline"
                    >
                      {category}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} VLOG. All rights reserved. Created by Samuel O-A
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <ThemeSwitcher />
    </footer>
  );
}

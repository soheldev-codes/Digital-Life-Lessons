"use client";

import Link from "next/link";
import { FaHome, FaBookOpen } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {/* Number */}
        <h1 className="text-8xl md:text-9xl font-black text-purple-600">404</h1>

        {/* Text */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 leading-relaxed">
          Oops! The page you’re looking for doesn’t exist or may have been
          moved.
        </p>

        {/* Image / Icon */}
        <div className="text-7xl mt-8">📚</div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            <FaHome />
            Go Home
          </Link>

          <Link
            href="/lessons"
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold flex items-center justify-center gap-2"
          >
            <FaBookOpen />
            Browse Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}

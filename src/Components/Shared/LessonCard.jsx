"use client";

import Link from "next/link";
import { FaHeart, FaBookmark, FaCrown, FaLock } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";

export default function LessonCard({ lesson }) {
  const { data: session } = useSession();

  const user = session?.user;

  const isPremiumLesson = lesson.access_level === "Premium";
  const userIsPremium = user?.isPremium || user?.role === "admin";

  const isLocked =
    isPremiumLesson && !userIsPremium && lesson.creator_email !== user?.email;

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border">
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center text-white p-5">
          <FaLock size={28} />
          <h3 className="font-bold mt-3">Premium Lesson</h3>
          <p className="text-sm text-center mt-1">
            Upgrade to unlock this lesson
          </p>

          <Link href="/pricing">
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-semibold flex items-center gap-2">
              <FaCrown />
              Upgrade
            </button>
          </Link>
        </div>
      )}

      <Link href={isLocked ? "/pricing" : `/lessons/${lesson._id}`}>
        {lesson.image_url && (
          <div className="h-52 overflow-hidden">
            <img
              src={lesson.image_url}
              alt={lesson.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        )}

        <div className="p-5">
          {/* badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              {lesson.category}
            </span>

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {lesson.emotional_tone}
            </span>

            {isPremiumLesson && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-1">
                <FaCrown size={10} />
                Premium
              </span>
            )}
          </div>

          <h2 className="text-xl font-bold line-clamp-2">{lesson.title}</h2>

          <p className="text-gray-500 mt-2 line-clamp-3 text-sm">
            {lesson.description}
          </p>

          {/* footer */}
          <div className="flex justify-between items-center mt-5 pt-4 border-t">
            <div className="flex items-center gap-2">
              <img
                src={lesson.creator_photo || "/avatar.png"}
                className="w-8 h-8 rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-semibold">{lesson.creator_name}</p>
              </div>
            </div>

            <div className="flex gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaHeart />
                {lesson.likes_count || 0}
              </span>

              <span className="flex items-center gap-1">
                <FaBookmark />
                {lesson.saves_count || 0}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

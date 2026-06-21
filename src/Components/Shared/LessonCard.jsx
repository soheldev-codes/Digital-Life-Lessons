"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { FiHeart, FiBookmark, FiLock, FiEye, FiAward } from "react-icons/fi";

export default function LessonCard({ lesson }) {
  const { data: session } = useSession();

  const user = session?.user;

  const isPremiumLesson = lesson.accessLevel === "Premium";
  const userIsPremium = user?.isPremium || user?.role === "admin";

  // নিজের lesson হলে lock হবে না
  const isLocked =
    isPremiumLesson && !userIsPremium && lesson.creatorEmail !== user?.email;

  return (
    <div className="group h-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden relative">
      {/* Premium Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center px-5">
          <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
            <FiLock size={26} className="text-yellow-600" />
          </div>

          <h3 className="mt-3 font-semibold">Premium Lesson</h3>

          <p className="text-sm text-gray-500 text-center mt-1">
            Upgrade to view this lesson
          </p>

          <Link href="/pricing">
            <button className="mt-4 px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2">
              <FiAward />
              Upgrade
            </button>
          </Link>
        </div>
      )}

      <Link href={isLocked ? "/pricing" : `/public-lessons/${lesson._id}`}>
        {/* Image */}
        {lesson.image && (
          <div className="h-52 overflow-hidden">
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        )}

        <div className="p-5 space-y-4">
          {/* badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs">
              {lesson.category}
            </span>

            <span className="px-3 py-1 rounded-full border border-gray-200 text-gray-600 text-xs">
              {lesson.emotionalTone}
            </span>

            {isPremiumLesson && (
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs flex items-center gap-1">
                <FiAward size={12} />
                Premium
              </span>
            )}
          </div>

          {/* title */}
          <h2 className="text-lg font-bold line-clamp-2 group-hover:text-purple-600 transition">
            {lesson.title}
          </h2>

          {/* description */}
          <p className="text-sm text-gray-500 line-clamp-2">
            {lesson.description}
          </p>

          {/* footer */}
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {lesson.creatorPhoto ? (
                <img
                  src={lesson.creatorPhoto}
                  className="w-8 h-8 rounded-full object-cover"
                  alt=""
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold">
                  {lesson.creatorName?.[0]}
                </div>
              )}

              <div>
                <p className="text-xs font-semibold">{lesson.creatorName}</p>

                <p className="text-[11px] text-gray-400">
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FiHeart size={14} />
                {lesson.reactionCount || 0}
              </span>

              <span className="flex items-center gap-1">
                <FiBookmark size={14} />
                {lesson.savesCount || 0}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { FaTrophy, FaCrown, FaBookOpen } from "react-icons/fa";

const contributors = [
  {
    name: "Sohel Rana",
    photo: "https://i.pravatar.cc/100?img=1",
    count: 24,
  },
  {
    name: "John Doe",
    photo: "https://i.pravatar.cc/100?img=2",
    count: 18,
  },
  {
    name: "Sarah",
    photo: "https://i.pravatar.cc/100?img=3",
    count: 15,
  },
  {
    name: "David",
    photo: "https://i.pravatar.cc/100?img=4",
    count: 11,
  },
  {
    name: "Emma",
    photo: "https://i.pravatar.cc/100?img=5",
    count: 9,
  },
];

const lessons = [
  {
    id: 1,
    title: "Failure Builds Character",
    creator: "Sohel Rana",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400",
    saves: 120,
  },
  {
    id: 2,
    title: "Learn From Mistakes",
    creator: "John Doe",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    saves: 98,
  },
  {
    id: 3,
    title: "Patience Wins",
    creator: "Sarah",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
    saves: 88,
  },
  {
    id: 4,
    title: "Discipline Over Motivation",
    creator: "David",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400",
    saves: 74,
  },
  {
    id: 5,
    title: "Never Stop Learning",
    creator: "Emma",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400",
    saves: 61,
  },
];

export default function TopContributors() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contributors */}
          <div>
            <div className="flex items-center gap-2 text-yellow-500 text-sm font-medium mb-3">
              <FaTrophy />
              This Week
            </div>

            <h2 className="text-3xl font-bold mb-8 gradient-brand-text">
              Top Contributors
            </h2>

            <div className="space-y-3">
              {contributors.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">
                    {i + 1}
                  </div>

                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.count} lessons shared
                    </p>
                  </div>

                  {i === 0 && <FaCrown className="text-yellow-500 text-lg" />}
                </div>
              ))}
            </div>
          </div>

          {/* Most Saved */}
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-3">
              <FaCrown />
              Community Favorites
            </div>

            <h2 className="text-3xl font-bold mb-8 gradient-brand-text">
              Most Saved Lessons
            </h2>

            <div className="space-y-3">
              {lessons.map((lesson, i) => (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                  <div className="flex items-center gap-4 p-4 mb-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">
                      {i + 1}
                    </div>

                    {lesson.image ? (
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <FaBookOpen />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        by {lesson.creator}
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                      {lesson.saves} saves
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

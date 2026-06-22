"use client";

import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import {
  FiBookOpen,
  FiHeart,
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiStar,
} from "react-icons/fi";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard-home", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/${user.email}`,
      );
      return res.data;
    },
  });

  console.log(dashboardData);

  const stats = [
    {
      title: "Total Lessons",
      value: dashboardData?.totalLessons || 0,
      icon: <FiBookOpen size={22} />,
    },
    {
      title: "Favorites",
      value: dashboardData?.favorites || 0,
      icon: <FiHeart size={22} />,
    },
    {
      title: "Likes",
      value: dashboardData?.totalLikes || 0,
      icon: <FiTrendingUp size={22} />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here’s your learning journey overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl   shadow-sm p-5 flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              {item.icon}
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                {isLoading ? "..." : item.value}
              </h3>
              <p className="text-gray-500 text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions + chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-2xl   shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-3">
            <Link href="/dashboard/add-lesson">
              <button className="w-full   rounded-xl p-4 flex items-center gap-3 hover:bg-gray-50">
                <FiPlus /> Create New Lesson
              </button>
            </Link>

            <Link href="/dashboard/my-lessons">
              <button className="w-full   rounded-xl p-4 flex items-center gap-3 hover:bg-gray-50">
                <FiBookOpen /> View My Lessons
              </button>
            </Link>

            <Link href="/dashboard/my-favorites">
              <button className="w-full   rounded-xl p-4 flex items-center gap-3 hover:bg-gray-50">
                <FiHeart /> View Favorites
              </button>
            </Link>

            {!user?.isPremium && (
              <Link href="/pricing">
                <button className="w-full bg-yellow-500 text-white rounded-xl p-4 flex items-center gap-3 hover:bg-yellow-600">
                  <FiStar /> Upgrade to Premium
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Fake chart */}
        <div className="bg-white rounded-2xl   shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Monthly Contributions</h2>

          <div className="space-y-4">
            {[40, 60, 80, 30, 90, 55].map((height, i) => (
              <div key={i}>
                <div className="w-full bg-gray-100 rounded-full h-4">
                  <div
                    className="bg-purple-600 h-4 rounded-full"
                    style={{ width: `${height}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent lessons */}
      <div className="bg-white rounded-2xl   shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <FiClock />
          Recently Added
        </h2>

        {dashboardData?.recentLessons?.length > 0 ? (
          <div className="space-y-3">
            {dashboardData.recentLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="  rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  <FiBookOpen />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{lesson.title}</h3>

                  <p className="text-sm text-gray-500">{lesson.category}</p>
                </div>

                <p className="text-sm text-gray-500">
                  {lesson.likesCount || 0} likes
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No lessons yet</p>

            <Link href="/dashboard/add-lesson">
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
                Create First Lesson
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

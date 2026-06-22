"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  FiUsers,
  FiBookOpen,
  FiFlag,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

export default function AdminHome() {
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
      );
      return res.data;
    },
  });

  const { data: lessons = [], isLoading: loadingLessons } = useQuery({
    queryKey: ["all-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-lessons`,
      );
      return res.data;
    },
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["all-reports"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/reports`,
      );
      return res.data;
    },
  });

  const publicLessons = lessons.filter(
    (lesson) => lesson.visibility === "Public",
  ).length;

  const todayLessons = lessons.filter((lesson) => {
    if (!lesson.createdAt) return false;

    const today = new Date().toDateString();
    return new Date(lesson.createdAt).toDateString() === today;
  }).length;

  const isLoading = loadingUsers || loadingLessons;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <FiUsers size={22} />,
      bg: "bg-blue-100 text-blue-600",
    },
    {
      title: "Public Lessons",
      value: publicLessons,
      icon: <FiBookOpen size={22} />,
      bg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Reports",
      value: reports.length,
      icon: <FiFlag size={22} />,
      bg: "bg-red-100 text-red-600",
    },
    {
      title: "Today's Lessons",
      value: todayLessons,
      icon: <FiTrendingUp size={22} />,
      bg: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <FiShield size={24} className="text-purple-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Platform overview and management</p>
        </div>
      </div>

      {/* stats */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                {item.icon}
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  {isLoading ? "..." : item.value}
                </h3>
                <p className="text-gray-500 text-sm">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* recent lessons */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-5">Recent Lessons</h2>

        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons found</p>
        ) : (
          <div className="space-y-4">
            {lessons.slice(0, 5).map((lesson) => (
              <div
                key={lesson._id}
                className="flex justify-between items-center border-b border-gray-200 pb-3"
              >
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">{lesson.category}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lesson.visibility === "Public"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {lesson.visibility}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

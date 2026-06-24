"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";
import LessonCard from "../Shared/LessonCard";

export default function FeaturedLessons() {
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/featured`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-8">Loading...</h2>
        </div>
      </section>
    );
  }

  if (!lessons.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 text-orange-500 font-medium mb-3">
            <FiStar />
            Featured Lessons
          </div>

          <h2 className="text-4xl font-bold mb-3">Featured Life Lessons</h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            Handpicked lessons from our community
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>

        {/* Footer Button */}
        <div className="text-center mt-10">
          <Link
            href="/public-lessons"
            className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all"
          >
            View All Lessons
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

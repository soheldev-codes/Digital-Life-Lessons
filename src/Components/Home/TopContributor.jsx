"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FiAward } from "react-icons/fi";
import { AiFillCrown } from "react-icons/ai";
import { MostSavedLessons } from "./MostSavedLessons";

export default function TopContributor() {
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["all-lessons-for-contributors"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`,
      );
      return res.data;
    },
  });

  const contributors = React.useMemo(() => {
    const map = {};

    lessons.forEach((lesson) => {
      const key = lesson.creatorEmail;

      if (!map[key]) {
        map[key] = {
          name: lesson.creatorName,
          photo: lesson.creatorPhoto,
          count: 0,
        };
      }

      map[key].count++;
    });

    return Object.values(map)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [lessons]);

  const rankColors = [
    "bg-orange-500 text-white",
    "bg-blue-100 text-blue-600",
    "bg-gray-200 text-gray-700",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top Contributors */}
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-3 font-medium">
              <FiAward />
              This Week
            </div>

            <h2 className="text-3xl font-bold mb-8">Top Contributors</h2>

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-3">
                {contributors.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        rankColors[i] || rankColors[2]
                      }`}
                    >
                      {i + 1}
                    </div>

                    <img
                      src={c.photo}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-gray-500">
                        {c.count} lessons shared
                      </p>
                    </div>

                    {i === 0 && (
                      <AiFillCrown className="text-orange-500" size={22} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <MostSavedLessons />
        </div>
      </div>
    </section>
  );
}

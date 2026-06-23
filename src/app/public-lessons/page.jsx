"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import LessonCard from "@/Components/Shared/LessonCard";

const CATEGORIES = [
  "All",
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
  "Health & Wellness",
  "Finance",
  "Spirituality",
];

const TONES = [
  "All",
  "Motivational",
  "Sad",
  "Realization",
  "Gratitude",
  "Reflective",
  "Hopeful",
  "Empowering",
];

const ITEMS_PER_PAGE = 9;

export default function PublicLessonsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [tone, setTone] = useState("All");
  const [page, setPage] = useState(1);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons`,
      );

      return res.data.filter((lesson) => lesson.visibility === "Public");
    },
  });

  console.log(lessons);

  const filtered = useMemo(() => {
    let result = [...lessons];

    if (search) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    if (tone !== "All") {
      result = result.filter((item) => item.emotional_tone === tone);
    }

    return result;
  }, [lessons, search, category, tone]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Public Lessons</h1>
        <p className="text-gray-500 mt-2">
          Discover wisdom shared by the community
        </p>
      </div>

      {/* filters */}
      <div className="bg-white shadow rounded-2xl p-5 mb-10">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute top-4 left-3 text-gray-400" />

            <input
              className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <select
            className="border border-gray-200 rounded-xl px-4"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            className="border border-gray-200 rounded-xl px-4"
            value={tone}
            onChange={(e) => {
              setTone(e.target.value);
              setPage(1);
            }}
          >
            {TONES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {/* cards */}
      {isLoading ? (
        <p>Loading...</p>
      ) : paginated.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold">No lessons found</h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          <button
            disabled={page === 1}
            className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-40"
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-40"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

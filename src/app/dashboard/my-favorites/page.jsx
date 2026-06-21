"use client";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiHeart, FiEye, FiTrash2, FiBookOpen } from "react-icons/fi";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

export default function MyFavoritesPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const queryClient = useQueryClient();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites?email=${user.email}`,
      );
      return res.data;
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (favorite) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/${favorite._id}`,
      );

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/${favorite.lessonId}/decrement-save`,
      );
    },

    onSuccess: () => {
      toast.success("Removed from favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },

    onError: () => {
      toast.error("Failed to remove");
    },
  });

  const filtered = favorites.filter((fav) => {
    if (categoryFilter !== "All" && fav.lessonCategory !== categoryFilter) {
      return false;
    }

    if (toneFilter !== "All" && fav.lessonTone !== toneFilter) {
      return false;
    }

    return true;
  });

  if (isLoading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">My Favorites</h1>

      <p className="text-gray-500 mb-6">{favorites.length} lessons saved</p>

      {/* filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-4 py-2 rounded-xl"
        >
          <option>All</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={toneFilter}
          onChange={(e) => setToneFilter(e.target.value)}
          className="border px-4 py-2 rounded-xl"
        >
          <option>All</option>
          {tones.map((tone) => (
            <option key={tone}>{tone}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="border rounded-2xl p-14 text-center">
          <FiHeart size={40} className="mx-auto text-gray-400 mb-4" />

          <h2 className="text-xl font-semibold">No favorites yet</h2>

          <p className="text-gray-500 mt-2">
            Save lessons you love to revisit later
          </p>

          <Link href="/public-lessons">
            <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl inline-flex items-center gap-2">
              <FiBookOpen />
              Browse Lessons
            </button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-2xl">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-4">Title</th>
                <th className="p-4 hidden md:table-cell">Category</th>
                <th className="p-4 hidden md:table-cell">Tone</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((fav) => (
                <tr key={fav._id} className="border-t">
                  <td className="p-4 font-medium">{fav.lessonTitle}</td>

                  <td className="p-4 hidden md:table-cell">
                    {fav.lessonCategory}
                  </td>

                  <td className="p-4 hidden md:table-cell">{fav.lessonTone}</td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <Link href={`/lessons/${fav.lessonId}`}>
                        <button className="p-2 rounded-lg hover:bg-gray-100">
                          <FiEye size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => removeMutation.mutate(fav)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-500"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

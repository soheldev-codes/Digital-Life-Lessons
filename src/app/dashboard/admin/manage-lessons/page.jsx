"use client";

import axios from "axios";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiSearch,
  FiStar,
  FiTrash,
  FiCheckCircle,
  FiEyeOff,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ManageLessons() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["admin-lessons"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/admin/lessons");
      return res.data;
    },
  });

  const featureMutation = useMutation({
    mutationFn: async (id) => {
      await axios.patch(`http://localhost:5000/admin/lessons/feature/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-lessons"]);
      toast.success("Lesson featured updated successfully");
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (id) => {
      await axios.patch(`http://localhost:5000/admin/lessons/review/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-lessons"]);
      toast.success("Lesson review updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5000/admin/lessons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-lessons"]);
      toast.success("Lesson deleted successfully");
    },
  });

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "Public")
      return matchesSearch && lesson.visibility === "Public";

    if (filter === "Private")
      return matchesSearch && lesson.visibility === "Private";

    if (filter === "Flagged") return matchesSearch && lesson.reportCount > 0;

    return matchesSearch;
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2">Manage Lessons</h1>

      <p className="text-gray-500 mb-6">
        {lessons.filter((l) => l.visibility === "Public").length} public •{" "}
        {lessons.filter((l) => l.visibility === "Private").length} private •{" "}
        {lessons.filter((l) => l.reportCount > 0).length} flagged
      </p>

      <div className="flex gap-4 mb-6">
        <div className="flex items-center border border-gray-200 rounded px-3 flex-1">
          <FiSearch />
          <input
            className="w-full p-3 outline-none"
            placeholder="Search lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border border-gray-200 rounded px-4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Public</option>
          <option>Private</option>
          <option>Flagged</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th>Author</th>
              <th>Visibility</th>
              <th>Reports</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLessons.map((lesson) => (
              <tr key={lesson._id} className="border-t border-gray-200">
                <td className="p-4">{lesson.title}</td>
                <td>{lesson.creatorName}</td>
                <td>
                  {lesson.visibility === "Public" ? (
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      Public
                    </span>
                  ) : (
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      <FiEyeOff className="inline mr-1" />
                      Private
                    </span>
                  )}
                </td>

                <td>{0 || 0}</td>

                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>

                <td>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => featureMutation.mutate(lesson._id)}>
                      <FiStar
                        className={
                          lesson.isFeatured
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      />
                    </button>

                    <button onClick={() => reviewMutation.mutate(lesson._id)}>
                      <FiCheckCircle
                        className={
                          lesson.isReviewed ? "text-green-500" : "text-gray-400"
                        }
                      />
                    </button>

                    <button onClick={() => deleteMutation.mutate(lesson._id)}>
                      <FiTrash className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

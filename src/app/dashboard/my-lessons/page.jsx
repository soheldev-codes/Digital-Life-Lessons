"use client";

import axios from "axios";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import {
  FiBookOpen,
  FiEdit,
  FiEye,
  FiTrash,
  FiPlus,
  FiHeart,
  FiBookmark,
  FiStar,
} from "react-icons/fi";

export default function MyLessonsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();

  const isPremium = user?.isPremium === true || user?.role === "admin";

  // lessons fetch
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-lessons/user/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`, // টোকেনটি অবশ্যই পাঠাতে হবে
          },
        },
      );
      return res.data;
    },
  });

  // update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${id}`,
        data,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-lessons", user?.email] });
      toast.success("Lesson updated");
    },
    onError: () => toast.error("Update failed"),
  });

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${id}`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-lessons", user?.email] });
      toast.success("Lesson deleted");
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleDelete = (id) => {
    const ok = confirm("Are you sure?");
    if (ok) deleteMutation.mutate(id);
  };

  const handleVisibility = (id, value) => {
    updateMutation.mutate({
      id,
      data: { visibility: value },
    });
  };

  const handleAccess = (id, value) => {
    updateMutation.mutate({
      id,
      data: { accessLevel: value },
    });
  };

  if (!user) {
    return router.push("/auth/login");
  }

  return (
    <div className="space-y-8">
      {/* top */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Lessons</h1>
          <p className="text-gray-500 mt-1">{lessons.length} lessons created</p>
        </div>

        <Link href="/dashboard/add-lesson">
          <button className="bg-purple-600 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-purple-700">
            <FiPlus />
            New Lesson
          </button>
        </Link>
      </div>

      {/* loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* empty */}
      {!isLoading && lessons.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <FiBookOpen size={50} className="mx-auto text-gray-300" />
          <h2 className="text-2xl font-bold mt-4">No lessons yet</h2>
          <p className="text-gray-500 mt-2">Start sharing your wisdom</p>
        </div>
      )}

      {/* table */}
      {!isLoading && lessons.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b bg-gray-50 border-gray-200">
              <tr className="text-left">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Visibility</th>
                <th className="p-4">Access</th>
                <th className="p-4">Stats</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="border-b border-gray-200">
                  <td className="p-4 font-medium max-w-[250px] truncate">
                    {lesson.title}
                  </td>

                  <td className="p-4">{lesson.category}</td>

                  {/* visibility */}
                  <td className="p-4">
                    <select
                      value={lesson.visibility}
                      onChange={(e) =>
                        handleVisibility(lesson._id, e.target.value)
                      }
                      className="border border-gray-200 rounded-lg px-3 py-2"
                    >
                      <option>Public</option>
                      <option>Private</option>
                    </select>
                  </td>

                  {/* access */}
                  <td className="p-4">
                    <select
                      disabled={!isPremium}
                      value={lesson.accessLevel || "Free"}
                      onChange={(e) => handleAccess(lesson._id, e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2 disabled:bg-gray-100"
                    >
                      <option>Free</option>
                      <option>Premium</option>
                    </select>

                    {!isPremium && (
                      <p className="text-xs text-gray-400 mt-1">Premium only</p>
                    )}
                  </td>

                  {/* stats */}
                  <td className="p-4">
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <FiHeart />
                        {lesson.reactionCount || 0}
                      </span>

                      <span className="flex items-center gap-1">
                        <FiBookmark />
                        {lesson.savesCount || 0}
                      </span>
                    </div>
                  </td>

                  {/* actions */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href={`/lessons/${lesson._id}`}>
                        <button className="p-2 rounded hover:bg-gray-100">
                          <FiEye />
                        </button>
                      </Link>

                      <Link href={`/dashboard/update-lesson/${lesson._id}`}>
                        <button className="p-2 rounded hover:bg-gray-100">
                          <FiEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="p-2 rounded hover:bg-red-50 text-red-500"
                      >
                        <FiTrash />
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

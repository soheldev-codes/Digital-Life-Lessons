"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiMail, FiUpload, FiSave, FiBookOpen, FiHeart } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.image || "");
  const [uploading, setUploading] = useState(false);

  // user lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/public/${user.email}`,
      );
      return res.data;
    },
  });

  // favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/${user.email}`,
      );
      return res.data;
    },
  });

  // update profile
  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.email}`,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  const handlePhotoUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    try {
      setUploading(true);

      const body = new FormData();
      body.append("image", image);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
        body,
      );

      setPhoto(res.data.data.url);
      toast.success("Photo uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    updateMutation.mutate({
      name,
      photoURL: photo,
    });
  };

  if (!user) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
          <div className="text-center">
            <div className="relative inline-block">
              <Image
                height={112}
                width={112}
                src={photo || "/avatar.png"}
                alt=""
                className="w-28 h-28 rounded-full object-cover border  border-purple-200"
              />

              <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer">
                <FiUpload />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>

            <h2 className="text-xl font-bold mt-4">{user.name}</h2>

            <p className="text-gray-500 flex justify-center items-center gap-2 mt-1">
              <FiMail />
              {user.email}
            </p>

            <div className="flex justify-center gap-2 mt-3">
              {user.isPremium && (
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm flex items-center gap-1">
                  <FaCrown /> Premium
                </span>
              )}

              {user.role === "admin" && (
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                  Admin
                </span>
              )}
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{lessons.length}</p>
              <p className="text-sm text-gray-500">Lessons</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{favorites.length}</p>
              <p className="text-sm text-gray-500">Favorites</p>
            </div>
          </div>

          {/* update */}
          <div className="space-y-4 mt-6">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              placeholder="Name"
            />

            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              placeholder="Photo URL"
            />

            <button
              onClick={handleSave}
              className="w-full bg-purple-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
            >
              <FiSave />
              {updateMutation.isPending ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">My Public Lessons</h2>

          {isLoading ? (
            <p>Loading lessons...</p>
          ) : lessons.length ? (
            <div className="grid md:grid-cols-2 gap-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow p-4"
                >
                  {lesson.image && (
                    <Image
                      height={160}
                      width={300}
                      alt={lesson.title}
                      src={lesson.image}
                      className="w-full h-40 object-cover rounded-xl mb-3"
                    />
                  )}

                  <h3 className="font-bold text-lg">{lesson.title}</h3>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {lesson.description}
                  </p>

                  <div className="flex justify-between mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiBookOpen />
                      {lesson.category}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiHeart />
                      {lesson.savesCount || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
              No public lessons yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

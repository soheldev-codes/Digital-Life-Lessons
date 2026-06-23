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

  // update profile
  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`,
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
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
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
              className="w-full bg-purple-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 cursor-pointer"
            >
              <FiSave />
              {updateMutation.isPending ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

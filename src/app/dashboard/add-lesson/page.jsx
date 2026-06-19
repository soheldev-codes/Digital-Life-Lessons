"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { FiUpload, FiPlus } from "react-icons/fi";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

export default function AddLessonPage() {
  const { data: session } = useSession();
  console.log(session);

  const user = session?.user;

  const isPremium = user?.isPremium || user?.role === "admin";

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    emotionalTone: "",
    visibility: "Public",
    accessLevel: "Free",
    image: "",
  });

  const mutation = useMutation({
    mutationFn: async (lessonData) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons`,
        lessonData,
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success("Lesson created successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        emotionalTone: "",
        visibility: "Public",
        accessLevel: "Free",
        image: "",
      });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create lesson");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    try {
      setLoadingImage(true);

      const body = new FormData();
      body.append("image", image);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        body,
      );

      const imageUrl = res.data.data.url;

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.emotionalTone
    ) {
      return toast.error("Please fill all required fields");
    }

    const lessonData = {
      ...formData,

      accessLevel: isPremium ? formData.accessLevel : "Free",

      creatorName: user?.name,
      creatorEmail: user?.email,
      creatorPhoto: user?.image || "",

      savesCount: 0,
      reactionCount: 0,
      isFeatured: false,
      isReviewed: false,
      createdAt: new Date(),
    };

    mutation.mutate(lessonData);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4">
      <h1 className="text-4xl font-bold mb-2">Add New Lesson</h1>

      <p className="text-gray-500 mb-8">Share your wisdom with the community</p>

      <div className="bg-white rounded-2xl shadow p-6 md:p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* title */}
          <div>
            <label className="font-medium block mb-2">Lesson Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What did you learn?"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* description */}
          <div>
            <label className="font-medium block mb-2">Full Description *</label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share the full story..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* category + tone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-2">Category *</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              >
                <option value="">Select category</option>

                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-medium block mb-2">Emotional Tone *</label>

              <select
                name="emotionalTone"
                value={formData.emotionalTone}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              >
                <option value="">Select tone</option>

                {tones.map((tone) => (
                  <option key={tone}>{tone}</option>
                ))}
              </select>
            </div>
          </div>

          {/* visibility + access */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-2">Visibility</label>

              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div>
              <label className="font-medium block mb-2">Access Level</label>

              <select
                disabled={!isPremium}
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 disabled:bg-gray-100"
              >
                <option>Free</option>
                <option>Premium</option>
              </select>

              {!isPremium && (
                <p className="text-xs text-gray-500 mt-1">
                  Upgrade to Premium to create paid lessons
                </p>
              )}
            </div>
          </div>

          {/* image */}
          <div>
            <label className="font-medium block mb-3">Image (Optional)</label>

            <label className="border border-gray-200  rounded-2xl h-36 flex flex-col justify-center items-center cursor-pointer">
              <FiUpload size={24} />

              <p className="mt-2 text-sm">
                {loadingImage ? "Uploading..." : "Click to upload"}
              </p>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {formData.image && (
              <img
                src={formData.image}
                alt=""
                className="mt-4 h-40 rounded-xl object-cover"
              />
            )}
          </div>

          <button
            disabled={mutation.isPending}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 cursor-pointer"
          >
            <FiPlus />

            {mutation.isPending ? "Creating..." : "Create Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
}

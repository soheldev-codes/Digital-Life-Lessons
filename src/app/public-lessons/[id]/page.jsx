"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaFlag,
  FaArrowLeft,
  FaPaperPlane,
  FaRegComment,
  FaEye,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { FcLike } from "react-icons/fc";

export default function LessonDetails() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const user = session?.user;

  const [commentText, setCommentText] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  // lesson
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/${id}`,
      );
      return res.data;
    },
  });

  // comments
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
      );
      return res.data;
    },
  });

  // related lessons
  const { data: related = [] } = useQuery({
    queryKey: ["related", lesson?.category],
    enabled: !!lesson,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/related/${lesson.category}?exclude=${lesson._id}`,
      );
      return res.data;
    },
  });

  // comment mutation
  const commentMutation = useMutation({
    mutationFn: async () => {
      console.log("add comment", commentText);
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
        lesson_id: id,
        text: commentText,
        user_name: user.name,
        user_photo: user.image,
        user_email: user.email,
      });
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries(["comments", id]);
    },
  });

  // like mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/like/${id}`,
        {
          email: user?.email,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson", id] });
    },
  });

  // favorite mutation
  const favoriteMutation = useMutation({
    mutationFn: async () => {
      // Check if the lesson is already favorited
      if (lesson.isFavorite) {
        // If it is, send a DELETE request to remove it from favorites
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/favorite/${id}`,
          { data: { email: user?.email } },
        );
      } else {
        // If it isn't, send a POST request to add it to favorites
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/favorite/${id}`,
          { email: user?.email },
        );
      }

      return !lesson.isFavorite; // Return the new favorite status
    },
    onSuccess: () => {
      // Invalidate the lesson query to refetch the updated lesson data
      queryClient.invalidateQueries(["lesson", id]);
    },
  });

  const reportMutation = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reports`, {
        lesson_id: id,
        lesson_title: lesson.title,
        reporter_email: user.email,
        reporter_name: user.name,
        reason,
        details,
      });
    },
    onSuccess: () => {
      setReportOpen(false);
      setReason("");
      setDetails("");
      toast.success("Report submitted successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong, please try again.");
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  if (!user) {
    return router.push("/auth/login");
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* category */}
      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
          {lesson.category}
        </span>
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
          {lesson.emotionalTone}
        </span>
      </div>

      {/* title */}
      <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>

      {/* meta */}
      <div className="flex gap-4 text-gray-500 mb-6">
        <span>{new Date(lesson.createdAt).toDateString()}</span>
        <span className="flex items-center gap-1">
          <FaEye />
          {lesson.views || 904}
        </span>
      </div>

      {/* image */}
      <Image
        height={400}
        width={800}
        src={lesson.image}
        className="rounded-2xl w-full mb-8"
        alt=""
      />

      {/* description */}
      <p className="leading-8 text-lg whitespace-pre-wrap mb-8">
        {lesson.description}
      </p>

      {/* actions */}
      <div className="border-y border-gray-200 py-5 flex gap-3">
        <button
          onClick={() => likeMutation.mutate()}
          className="border px-4 py-2 rounded-lg flex gap-2 items-center"
        >
          <FcLike />
          {lesson.reactionCount}
        </button>

        <button
          onClick={() => favoriteMutation.mutate()}
          className={`border border-gray-200 px-4 py-2 rounded-lg flex gap-2 items-center ${
            lesson.isFavorite ? "bg-red-50 text-red-500" : ""
          }`}
        >
          {lesson.saves_count ? <FaHeart /> : <FaBookmark />}
          {lesson.saves_count.length || 0}
        </button>

        <button
          onClick={() => setReportOpen(true)}
          className="border border-gray-200 px-4 py-2 rounded-lg flex gap-2 items-center text-red-500"
        >
          <FaFlag />
          Report
        </button>
      </div>

      {/* author */}
      <div className="bg-gray-100 rounded-2xl p-5 mt-8 flex gap-4 items-center">
        <Image
          height={150}
          width={150}
          src={lesson.creatorPhoto}
          className="w-14 h-14 rounded-full"
          alt=""
        />
        <div>
          <h3 className="font-bold">{lesson.creatorName}</h3>
          <p className="text-gray-500">Lesson Author</p>
        </div>
      </div>

      {/* comments */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold flex gap-2 items-center mb-4">
          <FaRegComment />
          Comments ({comments.length})
        </h2>

        <div className="flex gap-3 mb-6">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            className="border border-gray-200 rounded-xl px-4 py-3 w-full"
          />

          <button
            onClick={() => commentMutation.mutate()}
            className="bg-purple-500 text-white p-4 rounded-xl cursor-pointer "
          >
            <FaPaperPlane />
          </button>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-4 rounded-xl">
              <div className="flex gap-3 items-center mb-2">
                <Image
                  height={32}
                  width={32}
                  src={comment.user_photo}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <span className="font-semibold">{comment.user_name}</span>
              </div>

              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* related */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Lessons</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-xl p-4"
            >
              <Image
                height={200}
                width={400}
                src={item.image}
                className="rounded-lg mb-3"
                alt=""
              />
              <h3 className="font-bold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* report modal */}
      {reportOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Report Lesson</h2>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border border-gray-200 p-3 w-full mb-4 rounded-lg"
            >
              <option value="">Select reason</option>
              <option>Inappropriate Content</option>
              <option>Spam</option>
              <option>Misleading Information</option>
              <option>Harassment</option>
              <option>Copyright Violation</option>
              <option>Other</option>
            </select>

            <textarea
              className="border border-gray-200 rounded-lg p-3 w-full mb-4"
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />

            <div className="flex gap-3">
              <button onClick={() => setReportOpen(false)}>Cancel</button>

              <button
                onClick={() => reportMutation.mutate()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaHeart,
  FaBookmark,
  FaFlag,
  FaRegComment,
  FaPaperPlane,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";

export default function LessonDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      name: "Sohel Rana",
      text: "hello",
      createdAt: new Date(),
    },
  ]);

  useEffect(() => {
    async function loadLesson() {
      try {
        const res = await fetch(`http://localhost:5000/lessons/${id}`);
        const data = await res.json();
        setLesson(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadLesson();
  }, [id]);

  const handleComment = () => {
    if (!comment.trim()) return;

    setComments([
      ...comments,
      {
        name: "Current User",
        text: comment,
        createdAt: new Date(),
      },
    ]);

    setComment("");
  };

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!lesson) {
    return <div className="py-20 text-center">Lesson Not Found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 mb-6"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* badges */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
          {lesson.category}
        </span>

        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
          {lesson.emotionalTone}
        </span>
      </div>

      {/* title */}
      <h1 className="text-4xl font-bold mb-5">{lesson.title}</h1>

      {/* meta */}
      <div className="flex gap-5 flex-wrap text-gray-500 mb-8">
        <span className="flex items-center gap-2">
          <FaCalendarAlt />
          {new Date(lesson.createdAt).toDateString()}
        </span>

        <span className="flex items-center gap-2">
          <FaEye />
          {lesson.reactionCount}
        </span>
      </div>

      {/* image */}
      <img
        src={lesson.image}
        alt=""
        className="w-full rounded-2xl mb-8 h-[450px] object-cover"
      />

      {/* description */}
      <p className="text-lg leading-9 text-gray-700 whitespace-pre-wrap mb-8">
        {lesson.description}
      </p>

      {/* actions */}
      <div className="border-y py-5 flex gap-4 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border">
          <FaHeart />
          {lesson.reactionCount}
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border">
          <FaBookmark />
          {lesson.savesCount}
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-red-500">
          <FaFlag />
          Report
        </button>
      </div>

      {/* author */}
      <div className="bg-gray-100 rounded-2xl p-6 flex items-center gap-4 mb-10">
        <img
          src={lesson.creatorPhoto}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-lg">{lesson.creatorName}</h3>
          <p className="text-gray-500">Lesson Author</p>
        </div>
      </div>

      {/* comments */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-5">
          <FaRegComment />
          Comments ({comments.length})
        </h2>

        {/* comment box */}
        <div className="flex gap-3 mb-8">
          <textarea
            className="w-full border rounded-xl p-4"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleComment}
            className="w-12 h-12 bg-violet-500 text-white rounded-lg flex justify-center items-center"
          >
            <FaPaperPlane />
          </button>
        </div>

        {/* comment list */}
        <div className="space-y-4">
          {comments.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-4">
              <div className="flex gap-3 items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  {item.name[0]}
                </div>

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

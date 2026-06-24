"use client";
import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaFlag, FaTrash, FaCheckCircle, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ReportedLessons() {
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["all-reports"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reports`,
      );
      return res.data;
    },
  });

  const grouped = {};
  reports.forEach((r) => {
    if (!grouped[r.lesson_id]) {
      grouped[r.lesson_id] = {
        lesson_title: r.lesson_title,
        reports: [],
      };
    }
    grouped[r.lesson_id].reports.push(r);
  });

  const groupedArr = Object.entries(grouped).map(([lessonId, data]) => ({
    lessonId,
    ...data,
  }));

  const deleteMutation = useMutation({
    mutationFn: async (lessonId) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reported-lessons/${lessonId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-reports"]);
      toast.success("Lesson deleted");
    },
  });

  const ignoreMutation = useMutation({
    mutationFn: async (lessonId) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reports/lesson/${lessonId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-reports"]);
      toast.success("Reports cleared");
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaFlag className="text-red-500 text-2xl" />
        <div>
          <h1 className="text-3xl font-bold">Reported Lessons</h1>
          <p>{groupedArr.length} lessons reported</p>
        </div>
      </div>

      {groupedArr.length === 0 ? (
        <div className="text-center py-10">
          <FaCheckCircle className="mx-auto text-4xl text-green-500 mb-3" />
          <p>No reports found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-gray-200  border border-gray-200 ">
            <thead>
              <tr className="p-8">
                <th>Lesson</th>
                <th>Reports</th>
                <th>Top Reason</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {groupedArr.map((item) => {
                const reasons = {};

                item.reports.forEach((r) => {
                  reasons[r.reason] = (reasons[r.reason] || 0) + 1;
                });

                const mainReason = Object.entries(reasons).sort(
                  (a, b) => b[1] - a[1],
                )[0]?.[0];

                return (
                  <tr
                    key={item.lessonId}
                    className="bg-gray-50 hover:bg-gray-100 transition p-2 border border-gray-200"
                  >
                    <td>{item.lesson_title}</td>
                    <td>{item.reports.length}</td>
                    <td>{mainReason}</td>

                    <td className="flex gap-3">
                      <button
                        onClick={() =>
                          toast.success(
                            item.reports
                              .map((r) => `${r.reporter_name}: ${r.reason}`)
                              .join("\n"),
                          )
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => ignoreMutation.mutate(item.lessonId)}
                        className="text-green-500"
                      >
                        <FaCheckCircle />
                      </button>

                      <button
                        onClick={() => deleteMutation.mutate(item.lessonId)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

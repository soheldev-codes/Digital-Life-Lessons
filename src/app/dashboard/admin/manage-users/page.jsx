"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUsers, FaCrown, FaShieldAlt } from "react-icons/fa";

export default function ManageUsersPage() {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
      );
      return res.data;
    },
  });

  // Update role
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}/role`,
        { role },
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      toast.success("User role updated!");
    },

    onError: () => {
      toast.error("Failed to update role");
    },
  });

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaUsers className="text-purple-600 text-2xl" />

        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-gray-500">{users.length} total users</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left">
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200">
                    {/* user */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || "/avatar.png"}
                          className="w-10 h-10 rounded-full object-cover"
                          alt=""
                        />

                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>

                    {/* email */}
                    <td className="p-4 text-gray-500">{user.email}</td>

                    {/* status */}
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        {user.isPremium && (
                          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs flex items-center gap-1">
                            <FaCrown size={10} />
                            Premium
                          </span>
                        )}

                        {user.role === "admin" && (
                          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center gap-1">
                            <FaShieldAlt size={10} />
                            Admin
                          </span>
                        )}

                        {!user.isPremium && user.role !== "admin" && (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                            Free
                          </span>
                        )}
                      </div>
                    </td>

                    {/* role */}
                    <td className="p-4">
                      <select
                        value={user.role || "user"}
                        onChange={(e) =>
                          roleMutation.mutate({
                            id: user._id,
                            role: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option className="border border-gray-200" value="user">
                          User
                        </option>
                        <option
                          className="border border-gray-200"
                          value="admin"
                        >
                          Admin
                        </option>
                      </select>
                    </td>

                    {/* joined */}
                    <td className="p-4 text-gray-500 text-sm">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

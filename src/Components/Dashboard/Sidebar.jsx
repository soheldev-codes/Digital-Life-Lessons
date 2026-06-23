"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FaHome,
  FaBookOpen,
  FaHeart,
  FaUser,
  FaUsers,
  FaFlag,
  FaSignOutAlt,
  FaCrown,
  FaUserShield,
  FaPlusCircle,
} from "react-icons/fa";
import Image from "next/image";

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isAdmin = user?.role === "admin";

  const userRoutes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FaHome size={18} />,
    },
    {
      name: "Add Lesson",
      href: "/dashboard/add-lesson",
      icon: <FaPlusCircle size={18} />,
    },
    {
      name: "My Lessons",
      href: "/dashboard/my-lessons",
      icon: <FaBookOpen size={18} />,
    },
    {
      name: "My Favorites",
      href: "/dashboard/my-favorites",
      icon: <FaHeart size={18} />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <FaUser size={18} />,
    },
  ];

  const adminRoutes = [
    {
      name: "Admin Home",
      href: "/dashboard/admin",
      icon: <FaHome size={18} />,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: <FaUsers size={18} />,
    },
    {
      name: "Manage Lessons",
      href: "/dashboard/admin/manage-lessons",
      icon: <FaBookOpen size={18} />,
    },
    {
      name: "Reported Lessons",
      href: "/dashboard/admin/reported-lessons",
      icon: <FaFlag size={18} />,
    },
    {
      name: "Admin Profile",
      href: "/dashboard/admin/profile",
      icon: <FaUserShield size={18} />,
    },
  ];

  const routes = isAdmin ? adminRoutes : userRoutes;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-screen w-72
          bg-white dark:bg-[#161616]
          border-r border-gray-200 dark:border-gray-800
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center px-6 border-b dark:border-gray-800">
          <Link href="/">
            <h1 className="text-2xl font-bold text-purple-600">Life Lessons</h1>
          </Link>
        </div>

        {/* User */}
        <div className="p-5 border-b dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Image
              height={150}
              width={150}
              src={user?.image || "https://i.pravatar.cc/150"}
              alt=""
              className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500"
            />

            <div>
              <h3 className="font-semibold dark:text-white">
                {user?.name || "User"}
              </h3>

              <p className="text-xs text-gray-500">{user?.email}</p>

              {user?.isPremium && (
                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                  <FaCrown />
                  Premium
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="p-4 space-y-2">
          {routes.map((route) => {
            const active = pathname === route.href;

            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    active
                      ? "bg-purple-600 text-white shadow-lg"
                      : "hover:bg-purple-50 dark:hover:bg-gray-800"
                  }
                `}
              >
                {route.icon}
                {route.name}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

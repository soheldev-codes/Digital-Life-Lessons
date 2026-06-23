"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaBookOpen,
  FaBars,
  FaTimes,
  FaCrown,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Public Lessons", href: "/public-lessons" },
  ];

  const userLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Add Lesson", href: "/dashboard/add-lesson" },
    { label: "My Lessons", href: "/dashboard/my-lessons" },
    { label: "Pricing", href: "/pricing" },
  ];

  const adminLinks = [{ label: "Dashboard", href: "/dashboard/admin" }];

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/auth/login";
        },
      },
    });
  };

  if (isPending) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <FaBookOpen size={20} />
            </div>
            <h1 className="text-xl font-bold dark:text-white hidden sm:block">
              Life Lessons
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium hover:text-purple-600 transition"
              >
                {link.label}
              </Link>
            ))}

            {isAdmin
              ? adminLinks.map((link) => (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className="font-medium hover:text-purple-600 transition"
                  >
                    {link?.label}
                  </Link>
                ))
              : userLinks.map((link) => (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className="font-medium hover:text-purple-600 transition"
                  >
                    {link?.label}
                  </Link>
                ))}

            {/* {isLoggedIn &&
              userLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium hover:text-purple-600 transition"
                >
                  {link.label}
                </Link>
              ))} */}

            {/* {isAdmin && (
              <Link
                href="/dashboard/admin"
                className="font-semibold text-yellow-500"
              >
                Admin Panel
              </Link>
            )} */}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4 relative">
            {!isLoggedIn ? (
              <>
                <Link href="/auth/login">
                  <button className="px-5 py-2 rounded-lg border dark:border-gray-700">
                    Login
                  </button>
                </Link>

                <Link href="/auth/signup">
                  <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                {user?.isPremium && (
                  <span className="flex items-center gap-2 text-yellow-500 text-sm font-semibold">
                    <FaCrown />
                    Premium
                  </span>
                )}

                {/* Avatar */}
                <button onClick={() => setOpenDropdown(!openDropdown)}>
                  <img
                    src={user?.image || "https://i.pravatar.cc/100"}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover 
                    ring-2 ring-purple-500 ring-offset-2 
                    ring-offset-white dark:ring-offset-gray-950"
                  />
                </button>

                {/* Dropdown */}
                {openDropdown && (
                  <div className="absolute top-16 right-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-4 py-4 border-b dark:border-gray-700">
                      <p className="font-semibold dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <div className="p-3">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-2xl dark:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-5 flex flex-col gap-4">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium hover:text-purple-600 transition"
              >
                {link.label}
              </Link>
            ))}

            {isAdmin
              ? adminLinks.map((link) => (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className="font-medium hover:text-purple-600 transition"
                  >
                    {link?.label}
                  </Link>
                ))
              : userLinks.map((link) => (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className="font-medium hover:text-purple-600 transition"
                  >
                    {link?.label}
                  </Link>
                ))}

            {!isLoggedIn ? (
              <>
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/signup">Sign Up</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-left text-red-500">
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

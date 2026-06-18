"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuBookOpen } from "react-icons/lu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !dark;

    setDark(nextDark);

    if (nextDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <LuBookOpen size={22} />
            </div>

            <h1 className="text-2xl font-bold">Life Lessons</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>

            <Link href="/public-lessons" className="hover:text-indigo-600">
              Public Lessons
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <Link href="/login" className="font-medium hover:text-indigo-600">
              Login
            </Link>

            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-5 flex flex-col gap-4">
            <Link href="/">Home</Link>

            <Link href="/public-lessons">Public Lessons</Link>

            <button onClick={toggleTheme} className="text-left">
              {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>

            <Link href="/login">Login</Link>

            <Link
              href="/register"
              className="w-fit px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

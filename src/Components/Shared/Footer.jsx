"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold gradient-brand-text mb-4">
              Life Lessons
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Preserve your life experiences, share wisdom, and inspire others
              through meaningful lessons.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

            <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-indigo-600">
                Home
              </Link>

              <Link href="/public-lessons" className="hover:text-indigo-600">
                Public Lessons
              </Link>

              <Link href="/pricing" className="hover:text-indigo-600">
                Pricing
              </Link>

              <Link href="/about" className="hover:text-indigo-600">
                About
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>

            <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
              <Link href="/blog" className="hover:text-indigo-600">
                Blog
              </Link>

              <Link href="/faq" className="hover:text-indigo-600">
                FAQ
              </Link>

              <Link href="/support" className="hover:text-indigo-600">
                Support
              </Link>

              <Link href="/privacy" className="hover:text-indigo-600">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>

            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Get new lessons and updates directly in your inbox.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-l-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none"
              />

              <button className="px-4 gradient-button rounded-r-xl text-white">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-sm text-gray-500">
            © 2026 Life Lessons. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

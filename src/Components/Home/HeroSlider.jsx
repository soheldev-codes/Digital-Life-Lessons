"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBookOpen, FaCrown, FaUsers } from "react-icons/fa";
import Image from "next/image";

const slides = [
  {
    title: "Preserve Your Life's Most Valuable Lessons",
    subtitle:
      "Capture personal wisdom, share meaningful insights, and grow through the collective experiences of a mindful community.",
    image:
      "https://images.unsplash.com/photo-1617805784118-3c6a4b920c8d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Start Writing",
    ctaLink: "/register",
    icon: FaBookOpen,
  },
  {
    title: "Learn From Others, Grow Together",
    subtitle:
      "Explore thousands of life lessons shared by people from all walks of life.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    cta: "Browse Lessons",
    ctaLink: "/public-lessons",
    icon: FaUsers,
  },
  {
    title: "Premium Wisdom, Unlimited Access",
    subtitle:
      "Unlock premium content and create exclusive lessons for the community.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80",
    cta: "Go Premium",
    ctaLink: "/pricing",
    icon: FaCrown,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-primary-soft text-indigo-600 text-sm font-medium border border-indigo-300">
                <Icon className="text-sm" />
                Digital Life Lessons
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-brand-text">
                {slide.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-button text-white shadow-lg"
                >
                  {slide.cta}
                  <FaArrowRight size={16} />
                </Link>

                <Link
                  href="/public-lessons"
                  className="px-8 py-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Explore
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="relative hidden lg:block">
              <Image
                src={slide.image}
                width={600}
                height={450}
                alt="Hero"
                className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
              />

              <div className="absolute -bottom-5 -left-5 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5 border dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <FaBookOpen className="text-indigo-600 text-lg" />
                  </div>

                  <div>
                    <p className="font-semibold">10K+ Lessons</p>
                    <p className="text-sm text-gray-500">Shared by community</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-indigo-600"
                  : "w-2 bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

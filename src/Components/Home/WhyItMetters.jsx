"use client";

import { motion } from "framer-motion";
import { FaBrain, FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";

const benefits = [
  {
    icon: FaBrain,
    title: "Preserve Personal Wisdom",
    description:
      "Capture life's most valuable lessons before they fade. Your experiences become a timeless knowledge base.",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900",
  },
  {
    icon: FaLightbulb,
    title: "Mindful Reflection",
    description:
      "Writing about your experiences fosters deeper understanding and emotional processing of life events.",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900",
  },
  {
    icon: FaUsers,
    title: "Community Growth",
    description:
      "Learn from diverse perspectives. Someone else's mistake could be your shortcut to success.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900",
  },
  {
    icon: FaChartLine,
    title: "Track Your Journey",
    description:
      "Monitor your growth over time. See patterns in your learning and celebrate your progress.",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900",
  },
];

export default function WhyItMatters() {
  return (
    <section className="py-20 gradient-primary-soft ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-brand-text">
            Why Learning From Life Matters
          </h2>

          <p className="mt-3 max-w-lg mx-auto text-gray-600 dark:text-gray-300">
            Every experience holds a lesson. Here's why documenting them changes
            everything.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="gradient-card rounded-2xl p-6 h-full border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${benefit.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

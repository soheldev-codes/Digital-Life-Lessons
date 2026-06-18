/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // এখানে '**' দেওয়া যাবে না, 'https' বা 'http' দিতে হবে
        hostname: "**", // সব ডোমেইন এলাও করতে চাইলে এটি ঠিক আছে
        port: "",
        pathname: "**",
      },
      {
        protocol: "http", // যদি কিছু ইমেজ http হয়, তবে এটিও যোগ করুন
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

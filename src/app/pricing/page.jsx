"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <h1 className="text-5xl font-bold text-center mb-12">Unlock Premium</h1>

      <div className="max-w-md mx-auto border rounded-2xl p-8 shadow">
        <h2 className="text-2xl font-bold">Premium Plan</h2>
        <p className="text-4xl font-bold my-5">৳1500</p>

        <ul className="space-y-2 mb-6">
          <li>✔ Premium Lessons</li>
          <li>✔ Exclusive Content</li>
          <li>✔ Lifetime Access</li>
        </ul>

        <button
          disabled={user?.isPremium}
          onClick={() => router.push("/checkout")}
          className="w-full bg-orange-500 text-white py-3 rounded-xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {user?.isPremium ? "Already Premium User" : "Upgrade Now"}
        </button>
      </div>
    </div>
  );
}

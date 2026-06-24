"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const photoURL = form.get("photoURL");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    // validation
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMsg("Password must contain one uppercase letter.");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMsg("Password must contain one lowercase letter.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL || "",
        role: "user",
        isPremium: false,
        callbackURL: "/",
      });

      if (error) {
        setErrorMsg(error.message || "Signup failed");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (err) {
      setErrorMsg("Something went wrong");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMsg("");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setErrorMsg("Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f] px-4 py-8">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Join Life Lessons today
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <FcGoogle size={24} />
          {googleLoading ? "Loading..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-5">
          <span className="absolute px-2 bg-white dark:bg-[#1a1a1a] text-gray-500 text-sm">
            OR
          </span>
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-500 text-center">{errorMsg}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-lg border"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg border"
          />

          <input
            name="photoURL"
            placeholder="Photo URL (optional)"
            className="w-full p-3 rounded-lg border"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg border"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 rounded-lg border"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-purple-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

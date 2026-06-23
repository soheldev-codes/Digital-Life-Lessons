"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/Components/Dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/auth/login");
      return;
    }

    if (!isPending && user) {
      const isAdmin = user.role === "admin";
      const isAdminRoute = pathname.startsWith("/dashboard/admin");

      // user admin route access পাবে না
      if (!isAdmin && isAdminRoute) {
        router.push("/dashboard");
      }
    }
  }, [user, isPending, router, pathname]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0f0f0f]">
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 overflow-x-hidden">
        {/* Mobile Top */}
        <div className="lg:hidden h-16 px-4 flex items-center border-b bg-white dark:bg-[#161616]">
          <button onClick={() => setOpen(true)}>
            <FaBars size={20} />
          </button>
        </div>

        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

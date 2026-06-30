"use client";

import "../globals.css"
import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, UserCircle } from "lucide-react";
import { getUserRole, hasAccess, Role } from "@/lib/auth";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const role: Role = getUserRole();

  useEffect(() => {
    if (!hasAccess(role, pathname)) {
      router.replace("/dashboard");
    }
  }, [pathname, role, router]);

  const navItems = getNavItems(role);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex h-screen">
          <aside className="w-64 bg-white shadow flex flex-col">
            <div className="p-5 text-xl font-bold border-b">
              MF Admin Portal
            </div>

            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto p-4 border-t text-sm text-gray-400">
              Logged in as: {role.toUpperCase()}
            </div>
          </aside>

          <div className="flex flex-col flex-1">
            <header className="flex justify-between items-center bg-white shadow p-4">
              <h1 className="text-lg font-semibold">Operations Portal</h1>

              <div className="flex items-center gap-4">
                <Bell className="cursor-pointer" />
                <div className="flex items-center gap-2">
                  <UserCircle />
                  <span className="text-sm capitalize">{role}</span>
                </div>
              </div>
            </header>

            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

function getNavItems(role: Role) {
  const common = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/applications", label: "Applications" },
  ];

  const verifier = [{ href: "/verification", label: "Verification Workflow" }];

  const admin = [{ href: "/audit", label: "Audit Trail" }];

  if (role === "verifier") {
    return [...common, ...verifier];
  }

  return [...common, ...verifier, ...admin];
}

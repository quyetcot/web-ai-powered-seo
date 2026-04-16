"use client"; // Bắt buộc vì dùng usePathname và Link
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Posts", icon: FileText, href: "/posts" },
  { label: "Settings", icon: Settings, href: "/settings" },
];
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full bg-indigo-900 text-white w-64 p-4">
      {/* 1. Logo Section */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <Sparkles className="text-indigo-400" />
        <span className="font-bold text-xl uppercase tracking-wider">
          AI SEO
        </span>
      </div>
      {/* 2. Navigation Section */}
      <nav className="flex-1 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
              // ??? Nếu pathname === route.href thì thêm class 'bg-indigo-800 text-white'
              // ??? Ngược lại dùng class 'text-indigo-300 hover:text-white hover:bg-indigo-800/50'
              pathname === route.href
                ? "bg-indigo-800 text-white"
                : "text-indigo-300 hover:text-white hover:bg-indigo-800/50",
            )}
          >
            <route.icon className="w-5 h-5" />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

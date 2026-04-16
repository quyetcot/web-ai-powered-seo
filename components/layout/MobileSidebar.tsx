"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";

export default function MobileSidebar() {
  // Tránh lỗi Hydration khi dùng Sheet trong Next.js
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-indigo-900 border-none">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

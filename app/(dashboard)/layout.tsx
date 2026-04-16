import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      {/* Sidebar - Cố định bên trái trên Desktop */}
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-indigo-900">
        <Sidebar />
      </div>

      {/* Main Content - Đẩy sang phải một khoảng bằng width của Sidebar */}
      <main className="md:pl-64">
        <Navbar />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

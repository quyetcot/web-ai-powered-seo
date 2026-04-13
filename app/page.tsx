import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-900 dark:text-zinc-50">
          AI SEO Dashboard
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Hệ thống tối ưu nội dung thông minh.
        </p>
        <div className="flex gap-4 mt-8">
          {/* Tạm thời dùng thẻ button thuần để test hydration */}
          <button className="px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all dark:bg-zinc-50 dark:text-zinc-900">
            Khám phá ngay
          </button>
        </div>
      </div>
    </main>
  );
}

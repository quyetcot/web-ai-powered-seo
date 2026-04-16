import Editor from "@/components/editor/Editor";

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Viết bài mới</h2>
        <p className="text-muted-foreground">
          Sử dụng AI để tối ưu hóa bài viết của bạn.
        </p>
      </div>
      {/* Editor sẽ được đặt ở đây sau này */}
      <div className="bg-white border rounded-xl shadow-sm min-h-[500px] flex items-center justify-center text-gray-400">
        <Editor />
      </div>
    </div>
  );
}

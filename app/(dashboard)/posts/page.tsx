import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PostsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Bài viết của tôi
          </h2>
          <p className="text-muted-foreground">
            Quản lý và chỉnh sửa nội dung SEO của bạn.
          </p>
        </div>

        {/* Nút bấm chuyển trang sang route New Post */}
        <Link href="/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Viết bài mới
          </Button>
        </Link>
      </div>
      {/* Tạm thời là placeholder cho danh sách bài viết */}
      <div className="grid gap-4 mt-8">
        <div className="border rounded-lg p-8 text-center bg-muted/20">
          Chưa có bài viết nào. Hãy bắt đầu bằng cách nhấn Viết bài mới!
        </div>
      </div>
    </div>
  );
}

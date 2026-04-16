"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Bắt đầu viết nội dung SEO của bạn tại đây...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        // Thêm Tailwind class trực tiếp vào khung soạn thảo
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <EditorContent editor={editor} />
    </div>
  );
}

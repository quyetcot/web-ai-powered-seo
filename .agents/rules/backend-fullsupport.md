---
trigger: always_on
---

# Rule: Backend & Infrastructure — Full Code Support

## Phạm vi áp dụng
File pattern: `**/api/**`, `**/*.sql`, `**/middleware.ts`, `**/lib/supabase/**`, `**/lib/openai*`, `**/.env*`

---

## Nguyên tắc

Các phần này **không phải trọng tâm học React** của người dùng.  
Agent cung cấp code đầy đủ, production-ready, có comment giải thích ngắn.  
Ưu tiên: **đúng, bảo mật, dễ bảo trì** — không cần dạy từng dòng.

---

## Tiêu chuẩn code cho từng phần

### Next.js API Routes (`/app/api/**/route.ts`)
- Luôn export đúng HTTP method: `GET`, `POST`, `PUT`, `DELETE`
- Dùng `NextResponse.json()` để trả về response
- Luôn có try/catch với error handling rõ ràng
- Validate input trước khi xử lý (dùng Zod nếu phức tạp)
- Không để lộ stack trace ra response production
- Kiểm tra auth bằng Clerk `auth()` hoặc `currentUser()` đầu mỗi handler
- Ghi `ai_logs` sau mỗi lần gọi OpenAI

```typescript
// Template chuẩn cho API Route
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await req.json()
    // ... business logic
    
    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('[API_ERROR]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

### Supabase (SQL Schema & RLS)
- Luôn bật RLS cho tất cả bảng
- Policy phải dùng `auth.uid()` để isolate data theo user
- Index cho foreign keys và các cột query thường xuyên
- Dùng `gen_random_uuid()` cho primary key
- Timestamp cột dùng `TIMESTAMP WITH TIME ZONE`

### OpenAI Streaming
- Dùng `openai.beta.chat.completions.stream()`
- Trả về `ReadableStream` để client nhận từng chunk
- Log `prompt_tokens`, `completion_tokens`, `total_tokens` sau khi stream xong
- Kiểm tra rate limit của user trước khi gọi API

### Clerk Middleware
- Protect tất cả routes dưới `/dashboard` và `/api`
- Public routes: `/`, `/login`, `/register`, `/api/webhook`

### Environment Variables
- Tất cả secret: server-side only (không có prefix `NEXT_PUBLIC_`)
- Client-safe vars: dùng `NEXT_PUBLIC_` prefix
- Cung cấp `.env.example` với placeholder values

---

## Format khi cung cấp code

Luôn đánh nhãn `[BACKEND - full code]` ở đầu response.  
Cung cấp: file path + full code + giải thích ngắn (3-5 dòng) về logic chính.  
Nếu cần chạy migration SQL, hướng dẫn cụ thể cách chạy trên Supabase Dashboard.
---
trigger: always_on
---

# Rule: Project Architecture & Conventions

## Cấu trúc thư mục bắt buộc

```
ai-seo-dashboard/
├── GEMINI.md                          ← Rules (file này)
├── .agent/
│   ├── rules/
│   ├── workflows/
│   └── skills/
├── app/
│   ├── (auth)/                        ← Route group, không ảnh hưởng URL
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/                   ← Protected routes
│   │   ├── layout.tsx                 ← Sidebar + Navbar (SERVER component)
│   │   ├── dashboard/page.tsx
│   │   ├── posts/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── ai/generate/route.ts
│   │   ├── posts/route.ts
│   │   └── posts/[id]/route.ts
│   ├── layout.tsx                     ← Root layout (ClerkProvider, QueryProvider)
│   └── page.tsx                       ← Landing page
├── components/
│   ├── ui/                            ← Shadcn/ui (auto-generated, không sửa tay)
│   ├── editor/
│   ├── seo/
│   ├── dashboard/
│   └── layout/
├── hooks/                             ← Custom React hooks (use*.ts)
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  ← Browser client
│   │   └── server.ts                  ← Server client (dùng trong Server Components)
│   ├── openai.ts
│   ├── seo-checker.ts
│   └── utils.ts
├── store/                             ← Zustand stores
├── types/
│   └── index.ts
└── middleware.ts                      ← Clerk auth middleware
```

---

## Quy tắc đặt tên

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Component file | PascalCase | `SeoSidebar.tsx` |
| Hook file | camelCase với prefix `use` | `usePosts.ts` |
| Store file | camelCase với suffix `.store` | `ui.store.ts` |
| API route | lowercase | `route.ts` |
| Util function | camelCase | `calculateSeoScore.ts` |
| Type/Interface | PascalCase | `Post`, `SeoCheck` |

---

## Server vs Client Component

**Mặc định là Server Component.** Chỉ thêm `"use client"` khi:
- Dùng `useState`, `useEffect`, hooks khác
- Dùng browser APIs (localStorage, window, etc.)
- Cần event handlers (onClick, onChange)
- Dùng Zustand store

**Không cần `"use client"` cho:**
- Fetch data (dùng async/await trực tiếp trong component)
- Layout components (trừ khi có state)
- Static UI

---

## Import conventions

```typescript
// 1. React/Next imports
import { useState } from 'react'
import { notFound } from 'next/navigation'

// 2. Third-party
import { useQuery } from '@tanstack/react-query'

// 3. Internal — absolute imports (@/)
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

// 4. Types
import type { Post } from '@/types'
```

Cấu hình `tsconfig.json` paths: `@/*` → `./*`

---

## Naming conventions cho Supabase queries

```typescript
// Tên hàm: verb + noun + (điều kiện)
getUserPosts(userId: string)
getPostById(postId: string)
createPost(data: CreatePostInput)
updatePostSeoScore(postId: string, score: number)
```
# Skill: React Component Builder

**Mô tả:** Hướng dẫn xây dựng React component cho dự án SEO Dashboard.  
Skill này tự động load khi người dùng hỏi về cách tạo component, custom hook, hoặc UI feature.

---

## Quy trình xây dựng component (5 bước)

### Bước 1: Component Analysis
Trước khi viết bất kỳ dòng code nào, phân tích:

```
1. Server hay Client Component?
   → Cần state/event? → Client ("use client")
   → Chỉ hiển thị data? → Server (default)

2. Props interface là gì?
   → List ra tất cả props cần thiết
   → Optional vs Required?

3. State nào cần quản lý?
   → Local state (useState) hay global (Zustand)?
   → Server state (TanStack Query)?

4. Side effects nào?
   → Fetch data → TanStack Query, không dùng useEffect
   → DOM manipulation → useEffect với cleanup

5. Component có thể tái sử dụng không?
   → Nếu có → đặt vào components/
   → Nếu chỉ dùng 1 chỗ → đặt inline hoặc trong feature folder
```

### Bước 2: Skeleton Template

Cung cấp skeleton (không phải code đầy đủ):

```tsx
// Client Component Template
"use client"

import { useState } from "react"
// TODO: import Shadcn components cần thiết
// TODO: import custom hooks

interface {ComponentName}Props {
  // TODO: define props
}

export function {ComponentName}({ }: {ComponentName}Props) {
  // TODO: state declarations
  // TODO: handlers
  
  return (
    <div>
      {/* TODO: JSX structure */}
    </div>
  )
}
```

```tsx
// Server Component Template  
import { createClient } from "@/lib/supabase/server"

interface {ComponentName}Props {
  // TODO: define props
}

export async function {ComponentName}({ }: {ComponentName}Props) {
  // TODO: async data fetching
  
  return (
    <div>
      {/* TODO: JSX structure */}
    </div>
  )
}
```

### Bước 3: Shadcn Component Mapping

Gợi ý Shadcn component phù hợp cho từng UI element:

| UI Element | Shadcn Component | Import |
|-----------|-----------------|--------|
| Button | `Button` | `@/components/ui/button` |
| Input field | `Input` + `Label` | `@/components/ui/input` |
| Modal/Dialog | `Dialog` | `@/components/ui/dialog` |
| Dropdown | `DropdownMenu` | `@/components/ui/dropdown-menu` |
| Toast notification | `useToast` + `Toaster` | `@/components/ui/toast` |
| Loading | `Skeleton` | `@/components/ui/skeleton` |
| Badge/Tag | `Badge` | `@/components/ui/badge` |
| Card | `Card` | `@/components/ui/card` |
| Progress bar | `Progress` | `@/components/ui/progress` |
| Tabs | `Tabs` | `@/components/ui/tabs` |

### Bước 4: Common Patterns trong dự án này

**Pattern: Data fetching với TanStack Query**
```tsx
// Hướng dẫn (không phải code đầy đủ)
// 1. Tạo query function trong /hooks/use{Resource}.ts
// 2. Dùng useQuery({ queryKey: [...], queryFn: ... })
// 3. Handle loading và error states
// 4. Invalidate query sau mutation
```

**Pattern: Form handling**
```tsx
// Hướng dẫn
// 1. useState cho form values
// 2. Handler function cho onChange
// 3. Submit handler gọi API route
// 4. Loading state trong button
// 5. Error/success feedback với toast
```

**Pattern: Conditional rendering**
```tsx
// Vue: v-if / v-else
// React: ternary hoặc && operator trong JSX
// {isLoading ? <Skeleton /> : <ActualContent />}
// {error && <ErrorMessage error={error} />}
```

### Bước 5: Checklist trước khi submit

- [ ] TypeScript: không có `any`, props typed
- [ ] `"use client"` chỉ khi cần
- [ ] Loading state được handle
- [ ] Error state được handle
- [ ] Accessibility: aria labels, semantic HTML
- [ ] Responsive: dùng Tailwind responsive prefixes (md:, lg:)
- [ ] Dark mode: dùng Shadcn CSS variables (tự động support)
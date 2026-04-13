# Skill: SEO Checker Implementation

**Mô tả:** Hướng dẫn implement tính năng SEO Checker — logic chấm điểm và UI hiển thị.  
Skill này load khi người dùng hỏi về SEO scoring, SEO sidebar, hoặc `seo-checker.ts`.

---

## Kiến trúc tổng quan

```
lib/seo-checker.ts          ← Pure function, không React, TESTABLE
    ↓
hooks/useSeoScore.ts        ← Custom hook, wrap logic + debounce
    ↓
components/seo/SeoSidebar.tsx  ← UI hiển thị kết quả
```

---

## Phần 1: `lib/seo-checker.ts` (Pure Logic — BACKEND support)

Đây là business logic thuần, không có React. Agent cung cấp full code.

```typescript
// Cấu trúc đầy đủ sẽ được generate khi dùng /gen-backend

export interface SeoInput {
  title: string
  content: string        // HTML string từ TipTap
  focusKeyword: string
  metaDescription?: string
}

export interface SeoCheckResult {
  score: number          // 0-100
  checks: {
    titleLength: { pass: boolean; value: number; message: string }
    keywordInTitle: { pass: boolean; message: string }
    keywordDensity: { pass: boolean; value: number; message: string }
    hasH2: { pass: boolean; count: number; message: string }
    wordCount: { pass: boolean; value: number; message: string }
    hasInternalLink: { pass: boolean; message: string }
    metaDescLength: { pass: boolean; value: number; message: string }
  }
}

export function calculateSeoScore(input: SeoInput): SeoCheckResult {
  // Agent sẽ implement đầy đủ khi được yêu cầu
}
```

---

## Phần 2: `hooks/useSeoScore.ts` (Custom Hook — React Learning)

Người dùng tự viết với hướng dẫn sau:

**Yêu cầu của hook:**
- Nhận `content`, `title`, `focusKeyword` từ editor
- Gọi `calculateSeoScore()` mỗi khi content thay đổi
- Debounce 500ms để không chạy quá nhiều
- Trả về `SeoCheckResult`

**Gợi ý cho người dùng:**
```
Bạn cần:
1. useState để lưu SeoCheckResult
2. useEffect để "watch" content thay đổi → gọi calculateSeoScore
3. Debounce: dùng setTimeout + clearTimeout trong cleanup function của useEffect
   (đây là pattern quan trọng trong React, khác với Vue's watchEffect debounce)
```

**So sánh với Vue:**
```vue
// Vue: watchEffect với debounce từ VueUse
const debouncedScore = refDebounced(computed(() => 
  calculateSeoScore({ title, content, focusKeyword })
), 500)

// React: manual debounce với useEffect
useEffect(() => {
  const timer = setTimeout(() => {
    // calculate and setState
  }, 500)
  return () => clearTimeout(timer) // cleanup!
}, [content, title, focusKeyword])
```

---

## Phần 3: `components/seo/SeoSidebar.tsx` (React Component — Learning)

**Skeleton cho người dùng:**
```tsx
"use client"

// Props nhận từ Editor page
interface SeoSidebarProps {
  // TODO: props nào cần?
}

export function SeoSidebar({ }: SeoSidebarProps) {
  // TODO: gọi useSeoScore hook
  // TODO: render score circle (dùng Progress từ Shadcn)
  // TODO: render checklist items
}
```

**Checklist item UI pattern:**
```tsx
// Mỗi check item: icon + text + pass/fail color
// ✅ màu xanh | ❌ màu đỏ | ⚠️ màu vàng
// Dùng Tailwind: text-green-500, text-red-500, text-yellow-500
// Dark mode tự động vì Shadcn CSS variables
```

---

## Điểm học React từ feature này

1. **Debounce pattern** — rất phổ biến, phải biết
2. **Prop drilling vs Context** — khi nào cần lift state lên
3. **Pure functions trong React ecosystem** — tách business logic ra khỏi component
4. **`useMemo` vs `useEffect`** — score tính toán = useMemo, side effects = useEffect
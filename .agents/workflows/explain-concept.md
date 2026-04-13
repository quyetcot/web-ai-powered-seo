---
description: # Workflow: Giải thích Concept React
---

# Workflow: Giải thích Concept React

**Trigger:** `/explain-concept`  
**Mục đích:** Giải thích sâu một concept React, luôn so sánh với Vue để người dùng dễ hiểu

---

## Bước 1 — Nhận concept cần giải thích

Hỏi: "Bạn muốn hiểu concept nào? (ví dụ: useCallback, Server Components, Suspense, Context...)"

---

## Bước 2 — Cấu trúc giải thích chuẩn

Với mỗi concept, giải thích theo thứ tự:

### 2.1 Vue equivalent (30 giây đọc)
> "Trong Vue, bạn đã quen với X. Trong React, khái niệm tương đương là Y, nhưng hoạt động khác ở chỗ..."

### 2.2 Mental model
Giải thích "tại sao" concept này tồn tại.  
React giải quyết vấn đề gì với concept này?  
Dùng analogy thực tế nếu có thể.

### 2.3 Cú pháp và cách dùng cơ bản
Code ví dụ **đơn giản nhất có thể** — không liên quan đến dự án.  
Tối đa 20 dòng code.

### 2.4 Dấu hiệu nhận biết "khi nào dùng"
- ✅ Dùng khi: ...
- ❌ Không cần dùng khi: ...
- ⚠️ Anti-pattern phổ biến: ...

### 2.5 Trong dự án SEO Dashboard, concept này xuất hiện ở đâu?
Chỉ rõ file/component cụ thể trong dự án sẽ dùng concept này.

---

## Bước 3 — Bài tập nhỏ

Tạo một mini-exercise nhỏ (không liên quan đến dự án) để người dùng thực hành concept vừa học.  
Ví dụ: "Viết một custom hook `useLocalStorage` dùng useState và useEffect..."

---

## Concepts phổ biến cần chuẩn bị sẵn

- `useState` vs Vue `ref()`
- `useEffect` vs Vue `watch()` / `onMounted()`
- `useMemo` vs Vue `computed()`
- `useCallback` — khi nào thực sự cần?
- `useContext` vs Vue `provide/inject`
- Server Components vs Client Components
- `Suspense` và lazy loading
- TanStack Query — tại sao không dùng `useEffect` để fetch?
- Zustand vs Pinia
- Next.js App Router — layouts, loading, error boundaries
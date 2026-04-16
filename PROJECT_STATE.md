# Project State — AI-Powered SEO Dashboard

> File này được agent tự động cập nhật sau mỗi session làm việc.
> KHÔNG sửa tay trừ khi cần thiết.
> Luôn được commit vào Git.

---

## 📍 Trạng thái hiện tại

**Phase hiện tại:** Phase 3: MVP Core  
**Task đang làm:** Hoàn thiện Editor Toolbar  
**Cập nhật lần cuối:** 2026-04-16

---

## ✅ Đã hoàn thành

### Phase 1: Setup
- [x] Next.js init + TypeScript + Tailwind
- [x] Shadcn/ui init
- [x] Cấu hình tsconfig paths (@/*)
- [x] Git init + .gitignore + .env.example

### Phase 2: Database
- [x] Supabase project tạo
- [x] Schema: bảng users, posts, ai_logs
- [x] RLS policies đã bật
- [x] Supabase client (browser + server) đã setup

### Phase 3: MVP
- [x] Clerk setup + middleware
- [x] Login & Register pages (Custom UI with AuthWrapper)
- [x] Layout (Sidebar + Navbar)
- [x] TipTap editor cơ bản (đã xử lý SSR)
- [ ] API Route: POST /api/ai/generate (streaming)
- [ ] API Route: GET/POST /api/posts
- [ ] API Route: PUT/DELETE /api/posts/[id]
- [ ] useAI hook
- [ ] usePosts hook (TanStack Query)

### Phase 4: UI/UX
- [ ] Dashboard page + stats cards
- [ ] Recharts (line + bar)
- [ ] SEO Checker logic (lib/seo-checker.ts)
- [ ] useSeoScore hook
- [ ] SeoSidebar component
- [ ] Dark mode

### Phase 5: Deploy
- [ ] Deploy lên Vercel
- [ ] Env vars đã set trên Vercel
- [ ] Custom domain (nếu có)
- [ ] Demo video

---

## 🧠 Quyết định kỹ thuật đã chốt

| Quyết định | Lựa chọn | Lý do |
|-----------|---------|-------|
| Auth provider | Clerk | Dễ setup, hỗ trợ Google OAuth tốt |
| State management | Zustand + TanStack Query | Phân tách UI state vs server state |

---

## 📝 Ghi chú từ các session trước

### 2026-04-13 Session 1
- Khởi tạo file PROJECT_STATE.md.
- Chờ người dùng chọn Phase bắt đầu.

---

## 🚧 Việc còn dở / TODO tiếp theo

1. [ ] Tạo component `EditorToolbar.tsx` và tích hợp vào `Editor.tsx`
2. [ ] Xây dựng API Route `POST /api/ai/generate` (OpenAI Streaming)

---

## 🐛 Bugs / Issues đang mở

| Bug | File liên quan | Trạng thái |
|-----|---------------|-----------|

---

## 💡 React concepts đã học

- [x] useState, useEffect cơ bản
- [ ] useCallback, useMemo
- [ ] TanStack Query (useQuery, useMutation)
- [x] Zustand store
- [x] Server Components vs Client Components
- [x] Next.js App Router (layouts, loading, error)
- [ ] Streaming với ReadableStream
- [ ] Debounce pattern trong useEffect

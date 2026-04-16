# Phase 3 Plan: MVP Core

Mục tiêu: Xây dựng các tính năng cốt lõi của ứng dụng gồm Editor, AI Generation và quản lý bài viết.

## 📋 Danh sách Task

### 1. Layout & Navigation (Hoàn thành ✅)
- [x] Hoàn thiện `Sidebar.tsx` với các menu navigation (Dashboard, Posts, New Post, Settings) [REACT - hướng dẫn]
- [x] Hoàn thiện `Navbar.tsx` tích hợp `UserButton` của Clerk và `MobileSidebar` [REACT - hướng dẫn]
- [x] Kiểm tra kết nối giữa `DashboardLayout` và các page [REACT - hướng dẫn]

### 2. Quản lý bài viết (Backend)
- [ ] API Route: `GET /api/posts` (Lấy danh sách bài viết của user) [BACKEND - full code]
- [ ] API Route: `POST /api/posts` (Tạo bài viết mới) [BACKEND - full code]
- [ ] API Route: `PUT /api/posts/[id]` (Cập nhật bài viết) [BACKEND - full code]
- [ ] API Route: `DELETE /api/posts/[id]` (Xóa bài viết) [BACKEND - full code]

### 3. TanStack Query Hooks
- [ ] `usePosts` hook: Fetching và Refetching list bài viết [REACT - hướng dẫn]
- [ ] `usePost` hook: Lấy chi tiết một bài viết [REACT - hướng dẫn]
- [ ] Mutations cho Create, Update, Delete posts [REACT - hướng dẫn]

### 4. Editor & AI Integration
- [ ] Tích hợp TipTap editor cơ bản vào `app/posts/new/page.tsx` [REACT - hướng dẫn]
- [ ] API Route: `POST /api/ai/generate` (OpenAI streaming) [BACKEND - full code]
- [ ] `useAI` hook: Xử lý streaming data từ API và cập nhật vào Editor [REACT - hướng dẫn]

## ⏳ Ước tính thời gian
- Layout & Navigation: 1-2 giờ
- Backend & Hooks: 3-4 giờ
- Editor & AI: 4-5 giờ

## 🔗 Dependencies
- API Routes cần Supabase client đã setup (Đã xong)
- Hooks cần API Routes xong.
- UI components cần Shadcn/ui (Đã xong)

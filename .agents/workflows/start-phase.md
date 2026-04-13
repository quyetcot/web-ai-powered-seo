---
description: # Workflow: Bắt đầu giai đoạn mới
---

# Workflow: Bắt đầu giai đoạn mới

**Trigger:** `/start-phase`  
**Mục đích:** Hướng dẫn từng bước khi bắt đầu một giai đoạn mới trong roadmap 5 giai đoạn

---

## Bước 1 — Xác định giai đoạn

Hỏi người dùng đang ở giai đoạn nào:

```
Bạn muốn bắt đầu giai đoạn nào?
1. Phase 1: Tech Stack Setup (Next.js + TypeScript + Tailwind + Shadcn)
2. Phase 2: Database Design (Supabase schema + RLS)
3. Phase 3: MVP Core (Editor + AI + Auth)
4. Phase 4: UI/UX Polish (Dashboard + SEO Checker + Dark Mode)
5. Phase 5: Deployment (Vercel + Portfolio)
```

---

## Bước 2 — Checklist pre-requisites

Trước khi bắt đầu, kiểm tra bạn đã có:
- [ ] Node.js >= 20 (`node --version`)
- [ ] Git initialized
- [ ] Các file từ phase trước đã hoạt động

---

## Bước 3 — Tạo plan artifact

Tạo file `.agent/plans/phase-{N}-plan.md` với:
- Danh sách task cụ thể (checkbox)
- Ước tính thời gian mỗi task
- Phân loại: [BACKEND] hoặc [REACT-LEARN] cho từng task
- Dependencies giữa các task

---

## Bước 4 — Thực thi theo thứ tự

### Nếu là Phase 1 (Setup):
// turbo
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"
```
// turbo
```bash
npx shadcn@latest init
```
Sau đó hỏi người dùng review `tsconfig.json` và giải thích cấu trúc App Router khác gì so với Nuxt.

### Nếu là Phase 2 (Database):
Cung cấp full SQL schema từ SRS.  
Hướng dẫn từng bước chạy migration trên Supabase Dashboard.  
Giải thích RLS là gì và tại sao cần thiết (so sánh với Vue không có backend).

### Nếu là Phase 3 (MVP):
Bắt đầu với Auth (Clerk setup — BACKEND, full code).  
Tiếp theo Editor (TipTap — REACT, hướng dẫn).  
Sau đó AI Route (API Route — BACKEND, full code).

### Nếu là Phase 4 (UI Polish):
Dashboard layout trước (REACT, hướng dẫn).  
SEO Checker logic (REACT + lib, giải thích algorithm).  
Dark mode (Shadcn theming — mostly config, full support).

### Nếu là Phase 5 (Deploy):
// turbo
```bash
git add . && git commit -m "feat: ready for deployment"
```
Hướng dẫn connect Vercel + set env vars.

---

## Bước 5 — Wrap up

Sau khi hoàn thành phase, tạo summary:
- Những gì đã build được
- Concept React mới đã học
- Bài tập tự thực hành để consolidate
- Điểm cần chú ý trước khi sang phase tiếp theo
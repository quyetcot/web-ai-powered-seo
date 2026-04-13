---
trigger: always_on
---

# Rule: Session Memory & Project State

## Mục đích
Duy trì context xuyên suốt các conversation, kể cả khi xóa chat history hoặc mở conversation mới.  
Giải pháp: Agent đọc và ghi `PROJECT_STATE.md` ở project root — file này sống cùng code trên Git, không bao giờ mất.

---

## Quy tắc BẮT BUỘC khi bắt đầu conversation mới

**Bước đầu tiên** trước khi làm bất kỳ điều gì: đọc `PROJECT_STATE.md`.

```
Nếu file tồn tại:
  → Đọc nội dung
  → Thông báo ngắn cho người dùng: "Mình đã đọc project state. [tóm tắt 1-2 dòng]"
  → Tiếp tục từ chỗ dừng mà không hỏi lại những gì đã biết

Nếu file chưa tồn tại:
  → Tạo file với template bên dưới
  → Hỏi người dùng điền thông tin ban đầu
```

---

## Quy tắc BẮT BUỘC khi kết thúc conversation

Trước khi người dùng đóng chat, hoặc khi người dùng nói "xong", "tạm dừng", "hẹn mai":

1. Cập nhật `PROJECT_STATE.md` với những thay đổi trong session vừa rồi
2. Commit file này vào Git:

```bash
# // turbo
git add PROJECT_STATE.md && git commit -m "chore: update project state [$(date +'%Y-%m-%d')]"
```

---

## Template `PROJECT_STATE.md`

```markdown
# Project State — AI-Powered SEO Dashboard

> File này được agent tự động cập nhật sau mỗi session làm việc.
> KHÔNG sửa tay trừ khi cần thiết.
> Luôn được commit vào Git.

---

## 📍 Trạng thái hiện tại

**Phase hiện tại:** [1 / 2 / 3 / 4 / 5]  
**Task đang làm:** [mô tả ngắn]  
**Cập nhật lần cuối:** [YYYY-MM-DD]

---

## ✅ Đã hoàn thành

### Phase 1: Setup
- [ ] Next.js init + TypeScript + Tailwind
- [ ] Shadcn/ui init
- [ ] Cấu hình tsconfig paths (@/*)
- [ ] Git init + .gitignore + .env.example

### Phase 2: Database
- [ ] Supabase project tạo
- [ ] Schema: bảng users, posts, ai_logs
- [ ] RLS policies đã bật
- [ ] Supabase client (browser + server) đã setup

### Phase 3: MVP
- [ ] Clerk setup + middleware
- [ ] Layout (Sidebar + Navbar)
- [ ] TipTap editor cơ bản
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

<!-- Agent ghi lại những quyết định quan trọng để không hỏi lại -->

| Quyết định | Lựa chọn | Lý do |
|-----------|---------|-------|
| Auth provider | Clerk | Dễ setup, hỗ trợ Google OAuth tốt |
| State management | Zustand + TanStack Query | Phân tách UI state vs server state |
| ... | ... | ... |

---

## 📝 Ghi chú từ các session trước

<!-- Agent ghi lại những điều quan trọng, lỗi đã gặp, cách fix -->

### [YYYY-MM-DD] Session N
- Đã làm: ...
- Vấn đề gặp: ...
- Cách fix: ...
- Bỏ dở: ...

---

## 🚧 Việc còn dở / TODO tiếp theo

<!-- Luôn có mục này để biết bắt đầu từ đâu trong session mới -->

1. [ ] [Task cụ thể nhất, có thể làm ngay]
2. [ ] [Task tiếp theo]
3. [ ] [Task sau đó]

---

## 🐛 Bugs / Issues đang mở

| Bug | File liên quan | Trạng thái |
|-----|---------------|-----------|
| ... | ... | ... |

---

## 💡 React concepts đã học

<!-- Tracking tiến độ học để không giải thích lại những gì đã biết -->

- [x] useState, useEffect cơ bản
- [ ] useCallback, useMemo
- [ ] TanStack Query (useQuery, useMutation)
- [ ] Zustand store
- [ ] Server Components vs Client Components
- [ ] Next.js App Router (layouts, loading, error)
- [ ] Streaming với ReadableStream
- [ ] Debounce pattern trong useEffect
```

---

## Cách agent cập nhật file

Khi cập nhật, agent chỉ **thêm hoặc sửa** các mục liên quan đến session vừa rồi:
- Tick checkbox những task đã xong
- Thêm ghi chú session mới vào "Ghi chú từ các session trước"
- Cập nhật "Việc còn dở" với task tiếp theo cụ thể
- Thêm quyết định kỹ thuật nếu có
- Tick concept React đã học

**Không xóa lịch sử cũ** — chỉ append thêm vào.

---

## Lệnh nhanh cho người dùng

Người dùng có thể gõ trong chat:
- `"đọc state"` → Agent đọc và tóm tắt PROJECT_STATE.md
- `"cập nhật state"` → Agent cập nhật file ngay lập tức
- `"todo tiếp theo là gì?"` → Agent đọc mục "Việc còn dở" và trả lời
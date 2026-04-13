# Tài Liệu Đặc Tả Yêu Cầu Phần Mềm (SRS)
# AI-Powered SEO Dashboard

---

**Phiên bản:** 1.0.0  
**Ngày:** 13/04/2026  
**Trạng thái:** Draft  
**Tác giả:** Nhóm phát triển  

---

## Mục Lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Mô tả tổng quan hệ thống](#2-mô-tả-tổng-quan-hệ-thống)
3. [Yêu cầu chức năng](#3-yêu-cầu-chức-năng)
4. [Yêu cầu phi chức năng](#4-yêu-cầu-phi-chức-năng)
5. [Kiến trúc hệ thống](#5-kiến-trúc-hệ-thống)
6. [Thiết kế cơ sở dữ liệu](#6-thiết-kế-cơ-sở-dữ-liệu)
7. [Giao diện người dùng](#7-giao-diện-người-dùng)
8. [Tích hợp bên ngoài](#8-tích-hợp-bên-ngoài)
9. [Kế hoạch triển khai](#9-kế-hoạch-triển-khai)
10. [Rủi ro và giải pháp](#10-rủi-ro-và-giải-pháp)
11. [Phụ lục](#11-phụ-lục)

---

## 1. Giới Thiệu

### 1.1 Mục đích tài liệu

Tài liệu này mô tả đầy đủ các yêu cầu phần mềm cho hệ thống **AI-Powered SEO Dashboard** — một nền tảng SaaS hỗ trợ người dùng tạo nội dung, phân tích SEO và tối ưu hóa bài viết bằng trí tuệ nhân tạo. Tài liệu dành cho:

- Nhà phát triển phần mềm (Frontend, Backend)
- Kỹ sư QA / Tester
- Product Manager và Designer
- Nhà đầu tư hoặc bên liên quan kỹ thuật

### 1.2 Phạm vi dự án

Hệ thống cung cấp:

- Trình soạn thảo nội dung thông minh tích hợp AI
- Chấm điểm và gợi ý tối ưu SEO theo thời gian thực
- Quản lý bài viết theo trạng thái (Draft / Published)
- Xác thực người dùng và phân quyền theo gói dịch vụ
- Dashboard thống kê hiệu suất nội dung

### 1.3 Định nghĩa và từ viết tắt

| Thuật ngữ | Giải thích |
|-----------|-----------|
| SRS | Software Requirements Specification |
| MVP | Minimum Viable Product |
| SSR | Server-Side Rendering |
| API | Application Programming Interface |
| SEO | Search Engine Optimization |
| AI | Artificial Intelligence |
| SaaS | Software as a Service |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |

### 1.4 Tài liệu tham chiếu

- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- OpenAI API Reference: https://platform.openai.com/docs
- Shadcn/ui Components: https://ui.shadcn.com
- TanStack Query: https://tanstack.com/query

---

## 2. Mô Tả Tổng Quan Hệ Thống

### 2.1 Mô tả sản phẩm

AI-Powered SEO Dashboard là ứng dụng web dạng SaaS cho phép người dùng soạn thảo nội dung blog hoặc trang web, nhận gợi ý SEO tự động từ AI (dựa trên OpenAI GPT), chấm điểm chất lượng bài viết và quản lý toàn bộ bài viết trong một giao diện thống nhất.

### 2.2 Luồng hoạt động chính

```
Người dùng đăng nhập
       │
       ▼
  Tạo / Mở bài viết
       │
       ▼
  Soạn thảo nội dung (TipTap Editor)
       │
       ▼
  Gọi AI phân tích (OpenAI Streaming)
       │
       ▼
  Xem điểm SEO + gợi ý cải thiện
       │
       ▼
  Lưu nháp hoặc Xuất bản
```

### 2.3 Các loại người dùng

| Vai trò | Mô tả | Quyền hạn |
|---------|-------|-----------|
| **Guest** | Người chưa đăng nhập | Chỉ xem trang giới thiệu |
| **Free User** | Đã đăng ký gói miễn phí | Tạo tối đa 5 bài/tháng, giới hạn lượt gọi AI |
| **Pro User** | Đã đăng ký gói trả phí | Không giới hạn bài viết, ưu tiên AI |
| **Admin** | Quản trị viên hệ thống | Toàn quyền, quản lý người dùng và log |

### 2.4 Ràng buộc chung

- Hệ thống phải hoạt động trên trình duyệt hiện đại (Chrome, Firefox, Edge, Safari).
- Hỗ trợ thiết bị desktop và tablet (responsive từ 768px trở lên).
- Thời gian phản hồi AI không vượt quá 30 giây (dùng Streaming để cải thiện trải nghiệm).
- Tuân thủ GDPR: người dùng có quyền xóa tài khoản và dữ liệu.

---

## 3. Yêu Cầu Chức Năng

### 3.1 Mô-đun Xác Thực (Authentication)

#### 3.1.1 Đăng ký / Đăng nhập

| ID | Yêu cầu |
|----|---------|
| AUTH-01 | Hệ thống cho phép đăng nhập bằng Google OAuth 2.0 |
| AUTH-02 | Hệ thống cho phép đăng nhập bằng email + mật khẩu |
| AUTH-03 | Hỗ trợ tính năng "Quên mật khẩu" qua email |
| AUTH-04 | Phiên đăng nhập được duy trì bằng JWT, hết hạn sau 7 ngày |
| AUTH-05 | Người dùng có thể đăng xuất khỏi tất cả thiết bị |

#### 3.1.2 Quản lý tài khoản

| ID | Yêu cầu |
|----|---------|
| ACC-01 | Người dùng có thể cập nhật tên hiển thị và avatar |
| ACC-02 | Người dùng có thể xem gói dịch vụ hiện tại |
| ACC-03 | Người dùng có thể nâng cấp từ Free lên Pro |
| ACC-04 | Admin có thể vô hiệu hóa tài khoản người dùng |

---

### 3.2 Mô-đun Soạn Thảo Nội Dung (Editor)

| ID | Yêu cầu |
|----|---------|
| EDIT-01 | Tích hợp trình soạn thảo rich-text TipTap hỗ trợ: bold, italic, heading, list, link, blockquote |
| EDIT-02 | Tự động lưu nháp mỗi 30 giây (auto-save) |
| EDIT-03 | Hỗ trợ nhập tiêu đề bài viết riêng biệt với nội dung |
| EDIT-04 | Hỗ trợ nhập từ khóa SEO mục tiêu |
| EDIT-05 | Đếm số từ và thời gian đọc ước tính hiển thị theo thời gian thực |
| EDIT-06 | Người dùng có thể chọn trạng thái bài: Draft / Published |
| EDIT-07 | Hỗ trợ Dark Mode cho editor |

---

### 3.3 Mô-đun AI (AI Integration)

| ID | Yêu cầu |
|----|---------|
| AI-01 | Người dùng có thể kích hoạt AI phân tích nội dung bằng 1 click |
| AI-02 | AI trả về gợi ý cải thiện SEO theo từng mục: tiêu đề, mô tả meta, từ khóa, cấu trúc heading |
| AI-03 | Phản hồi AI được truyền theo dạng Streaming (chữ chảy từng từ) |
| AI-04 | Mỗi lần gọi AI được ghi vào bảng `ai_logs` để kiểm soát chi phí |
| AI-05 | Free User bị giới hạn 10 lượt gọi AI/tháng; Pro User không giới hạn |
| AI-06 | Hệ thống hiển thị số lượt AI còn lại cho Free User |
| AI-07 | AI có thể đề xuất viết lại đoạn nội dung nếu người dùng yêu cầu |

---

### 3.4 Mô-đun SEO Checker

| ID | Yêu cầu |
|----|---------|
| SEO-01 | Hệ thống tự động chấm điểm SEO từ 0–100 khi nội dung thay đổi |
| SEO-02 | Tiêu chí chấm điểm bao gồm: độ dài tiêu đề (50–60 ký tự), mật độ từ khóa (1–3%), có H2/H3 hay không, độ dài bài viết (≥ 300 từ), có internal link hay không |
| SEO-03 | Điểm SEO được hiển thị bằng vòng tròn tiến trình màu sắc (xanh/vàng/đỏ) |
| SEO-04 | Danh sách checklist SEO chi tiết hiển thị bên cạnh editor |
| SEO-05 | Điểm SEO được lưu vào cột `seo_score` trong bảng `posts` khi lưu bài |

---

### 3.5 Mô-đun Quản Lý Bài Viết (Post Management)

| ID | Yêu cầu |
|----|---------|
| POST-01 | Người dùng xem danh sách tất cả bài viết với phân trang (10 bài/trang) |
| POST-02 | Lọc bài viết theo trạng thái: All / Draft / Published |
| POST-03 | Tìm kiếm bài viết theo tiêu đề |
| POST-04 | Xóa bài viết (chuyển vào thùng rác, xóa vĩnh viễn sau 30 ngày) |
| POST-05 | Sao chép (duplicate) một bài viết |
| POST-06 | Xem lịch sử chỉnh sửa bài viết |

---

### 3.6 Mô-đun Dashboard & Thống Kê

| ID | Yêu cầu |
|----|---------|
| DASH-01 | Hiển thị tổng số bài viết, bài đã xuất bản, điểm SEO trung bình |
| DASH-02 | Biểu đồ đường (line chart) thể hiện số bài viết tạo theo tuần |
| DASH-03 | Biểu đồ cột (bar chart) thể hiện phân phối điểm SEO |
| DASH-04 | Hiển thị số lượt gọi AI đã sử dụng trong tháng hiện tại |
| DASH-05 | Widget thống kê nhanh (Quick Stats) ngay trên màn hình chính |

---

## 4. Yêu Cầu Phi Chức Năng

### 4.1 Hiệu năng

| ID | Yêu cầu |
|----|---------|
| PERF-01 | Trang web tải lần đầu trong < 3 giây trên kết nối 4G |
| PERF-02 | Lighthouse Performance Score ≥ 85 |
| PERF-03 | API response (không bao gồm AI) < 500ms |
| PERF-04 | SEO Checker chạy client-side, không gây lag khi gõ phím |

### 4.2 Bảo mật

| ID | Yêu cầu |
|----|---------|
| SEC-01 | Tất cả API endpoints được bảo vệ bằng JWT authentication |
| SEC-02 | Người dùng chỉ truy cập được dữ liệu của chính mình (Row-Level Security trong Supabase) |
| SEC-03 | API Key của OpenAI không được lộ ra phía client |
| SEC-04 | Toàn bộ dữ liệu truyền qua HTTPS |
| SEC-05 | Áp dụng Rate Limiting: tối đa 60 request/phút/IP |

### 4.3 Khả năng mở rộng

| ID | Yêu cầu |
|----|---------|
| SCALE-01 | Kiến trúc Serverless (Next.js API Routes + Vercel) cho phép scale tự động |
| SCALE-02 | Cơ sở dữ liệu PostgreSQL (Supabase) hỗ trợ đến 100.000 bài viết mà không cần thay đổi schema |

### 4.4 Khả năng bảo trì

| ID | Yêu cầu |
|----|---------|
| MAINT-01 | Code TypeScript với type-safe strict mode |
| MAINT-02 | Tất cả component được viết theo chuẩn Shadcn/ui |
| MAINT-03 | Có ít nhất 60% unit test coverage cho business logic |
| MAINT-04 | Sử dụng ESLint + Prettier để thống nhất code style |

---

## 5. Kiến Trúc Hệ Thống

### 5.1 Tech Stack

| Lớp | Công nghệ | Mục đích |
|-----|-----------|---------|
| **Frontend Framework** | Next.js 14 (App Router) | SSR, routing, API routes |
| **Ngôn ngữ** | TypeScript | Type safety |
| **UI Library** | Shadcn/ui + Tailwind CSS | Component design system |
| **State Management** | Zustand | UI state (sidebar, modal) |
| **Data Fetching** | TanStack Query | Server state, caching |
| **Editor** | TipTap | Rich text editor |
| **Charts** | Recharts | Dashboard visualizations |
| **Authentication** | Clerk / NextAuth.js | User auth + OAuth |
| **Database** | Supabase (PostgreSQL) | Persistent data storage |
| **AI** | OpenAI SDK (GPT-4o) | Content analysis & generation |
| **Deployment** | Vercel | CI/CD, hosting |

### 5.2 Sơ đồ kiến trúc tổng quan

```
┌─────────────────────────────────────────────────┐
│                   CLIENT (Browser)               │
│  Next.js App Router + React + Tailwind + Shadcn  │
│  Zustand (UI State) + TanStack Query (API State) │
└────────────────────┬────────────────────────────┘
                     │ HTTPS
┌────────────────────▼────────────────────────────┐
│              SERVER (Vercel Edge/Node)            │
│           Next.js API Routes (Serverless)         │
│  /api/ai/generate   /api/posts   /api/seo-check  │
└──────┬──────────────────────────┬───────────────┘
       │                          │
       ▼                          ▼
┌─────────────┐          ┌───────────────────┐
│  OpenAI API │          │  Supabase          │
│  GPT-4o     │          │  PostgreSQL DB      │
│  (Streaming)│          │  Auth + Storage     │
└─────────────┘          └───────────────────┘
```

### 5.3 Luồng dữ liệu AI (Streaming)

```
Client                    Next.js API Route             OpenAI
  │                             │                          │
  │──── POST /api/ai/generate ──►│                          │
  │                             │──── stream request ─────►│
  │                             │◄──── chunk 1 ────────────│
  │◄──── chunk 1 ───────────────│                          │
  │                             │◄──── chunk 2 ────────────│
  │◄──── chunk 2 ───────────────│                          │
  │                             │         ...              │
  │◄──── [DONE] ────────────────│◄──── [DONE] ─────────────│
  │                             │                          │
  │                    [Log to ai_logs table]
```

---

## 6. Thiết Kế Cơ Sở Dữ Liệu

### 6.1 Bảng `users`

```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  display_name  VARCHAR(100),
  avatar_url    TEXT,
  plan          VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  ai_calls_used INTEGER DEFAULT 0,
  ai_calls_reset TIMESTAMP WITH TIME ZONE,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Mô tả các cột:**

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `id` | UUID | Khóa chính tự sinh |
| `email` | VARCHAR | Email duy nhất của người dùng |
| `display_name` | VARCHAR | Tên hiển thị |
| `plan` | VARCHAR | Gói dịch vụ: `free` hoặc `pro` |
| `ai_calls_used` | INTEGER | Số lượt gọi AI đã dùng trong tháng |
| `ai_calls_reset` | TIMESTAMP | Thời điểm reset bộ đếm AI hàng tháng |

---

### 6.2 Bảng `posts`

```sql
CREATE TABLE posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         VARCHAR(255) NOT NULL DEFAULT '',
  content       TEXT DEFAULT '',
  focus_keyword VARCHAR(100),
  seo_score     SMALLINT DEFAULT 0 CHECK (seo_score BETWEEN 0 AND 100),
  status        VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'deleted')),
  word_count    INTEGER DEFAULT 0,
  published_at  TIMESTAMP WITH TIME ZONE,
  deleted_at    TIMESTAMP WITH TIME ZONE,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_status ON posts(status);
```

**Mô tả các cột:**

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `title` | VARCHAR | Tiêu đề bài viết |
| `content` | TEXT | Nội dung HTML từ TipTap editor |
| `focus_keyword` | VARCHAR | Từ khóa SEO mục tiêu |
| `seo_score` | SMALLINT | Điểm SEO từ 0–100 |
| `status` | VARCHAR | Trạng thái: draft / published / deleted |
| `word_count` | INTEGER | Số từ trong bài |

---

### 6.3 Bảng `ai_logs`

```sql
CREATE TABLE ai_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id       UUID REFERENCES posts(id) ON DELETE SET NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  total_tokens  INTEGER DEFAULT 0,
  model         VARCHAR(50) DEFAULT 'gpt-4o',
  action        VARCHAR(50),  -- 'analyze_seo', 'rewrite_section', etc.
  cost_usd      NUMERIC(10, 6) DEFAULT 0,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for cost monitoring
CREATE INDEX idx_ai_logs_user_id ON ai_logs(user_id);
CREATE INDEX idx_ai_logs_created_at ON ai_logs(created_at);
```

**Mục đích:** Theo dõi toàn bộ lịch sử gọi API OpenAI để kiểm soát chi phí và hạn mức người dùng.

---

### 6.4 Row-Level Security (RLS) — Supabase

```sql
-- Users chỉ xem được post của chính mình
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own posts"
  ON posts FOR ALL
  USING (auth.uid() = user_id);

-- AI logs chỉ admin mới xem được tất cả
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ai_logs"
  ON ai_logs FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 7. Giao Diện Người Dùng

### 7.1 Cấu trúc màn hình

```
├── /                     → Landing Page (Public)
├── /login                → Trang đăng nhập
├── /register             → Trang đăng ký
├── /dashboard            → Dashboard chính (Protected)
│   ├── /posts            → Danh sách bài viết
│   ├── /posts/new        → Tạo bài viết mới
│   ├── /posts/[id]       → Chỉnh sửa bài viết
│   ├── /analytics        → Thống kê (Pro)
│   └── /settings         → Cài đặt tài khoản
└── /admin                → Quản trị (Admin only)
```

### 7.2 Layout Dashboard

```
┌──────────────────────────────────────────────────┐
│  NAVBAR: Logo | Search | Notifications | Avatar  │
├──────────┬───────────────────────────────────────┤
│          │                                        │
│ SIDEBAR  │         MAIN CONTENT AREA              │
│          │                                        │
│ • Dashboard│  ┌──────────────────────────────┐   │
│ • Posts  │  │  Quick Stats Cards            │   │
│ • Analytics│  └──────────────────────────────┘   │
│ • Settings│  ┌──────────────────────────────┐   │
│          │  │  Charts (Line + Bar)           │   │
│          │  └──────────────────────────────┘   │
│          │                                        │
└──────────┴───────────────────────────────────────┘
```

### 7.3 Layout Editor

```
┌──────────────────────────────────────────────────┐
│  ← Back | [Title Input]        [Save] [Publish]  │
├────────────────────────┬─────────────────────────┤
│                        │                          │
│   TIPTAP EDITOR        │   SEO SIDEBAR            │
│                        │  ┌─────────────────────┐│
│   [Focus Keyword: ___] │  │  SEO Score: 72/100  ││
│                        │  │  ████████░░  🟡      ││
│   # Heading            │  └─────────────────────┘│
│   Content here...      │                          │
│                        │  ✅ Title length OK       │
│                        │  ✅ Keyword found         │
│   [🤖 Analyze with AI] │  ❌ Meta description missing│
│                        │  ✅ Has H2 headings       │
│                        │  ❌ Too short (< 300 words)│
└────────────────────────┴─────────────────────────┘
```

### 7.4 Yêu cầu giao diện

- Hỗ trợ **Dark Mode** với toggle trên Navbar.
- Toàn bộ component dùng **Shadcn/ui** để đảm bảo nhất quán.
- Màu sắc chính: `#6366F1` (Indigo-500).
- Font chữ: Inter (Google Fonts).
- Responsive tối thiểu từ 768px (tablet).

---

## 8. Tích Hợp Bên Ngoài

### 8.1 OpenAI API

| Thông tin | Chi tiết |
|-----------|---------|
| Endpoint | `https://api.openai.com/v1/chat/completions` |
| Model | `gpt-4o` |
| Method | Streaming (`stream: true`) |
| Authentication | Bearer Token (API Key lưu trong `.env.local`) |
| Giới hạn | Tối đa 4096 tokens/request cho response |

**Ví dụ API Route (`/app/api/ai/generate/route.ts`):**

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { content, keyword } = await req.json();

  const stream = openai.beta.chat.completions.stream({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are an SEO expert...' },
      { role: 'user', content: `Analyze this content for SEO:\n${content}` }
    ],
  });

  return new Response(stream.toReadableStream());
}
```

### 8.2 Supabase

| Thông tin | Chi tiết |
|-----------|---------|
| Database | PostgreSQL (Managed) |
| Auth | Supabase Auth (JWT + OAuth) |
| SDK | `@supabase/supabase-js` |
| RLS | Bật cho tất cả bảng |
| Realtime | Không dùng trong MVP |

### 8.3 Clerk / NextAuth

- Sử dụng **Clerk** (ưu tiên) hoặc **NextAuth.js** (fallback).
- Hỗ trợ: Google OAuth, Email/Password.
- Session timeout: 7 ngày.

### 8.4 Vercel

- Auto-deploy từ nhánh `main` trên GitHub.
- Preview deployment cho mỗi Pull Request.
- Biến môi trường được cấu hình qua Vercel Dashboard.

---

## 9. Kế Hoạch Triển Khai

### 9.1 Roadmap theo giai đoạn

| Giai đoạn | Nội dung | Thời gian dự kiến |
|-----------|---------|------------------|
| **Phase 1** | Tech Stack Setup: Next.js + TypeScript + Tailwind + Shadcn | 1–2 ngày |
| **Phase 2** | Database Design: Supabase schema + RLS | 1 ngày |
| **Phase 3** | MVP Core: Editor + AI Integration + Auth | 5–7 ngày |
| **Phase 4** | UI/UX Polish: Dashboard + SEO Checker + Dark Mode | 3–4 ngày |
| **Phase 5** | Deployment + Portfolio: Vercel + Demo Video | 1–2 ngày |

**Tổng thời gian ước tính: 11–16 ngày làm việc**

### 9.2 Môi trường triển khai

| Môi trường | Mục đích | URL |
|-----------|---------|-----|
| `development` | Local dev | `http://localhost:3000` |
| `preview` | PR review | `https://project-[hash].vercel.app` |
| `production` | Live | `https://your-domain.vercel.app` |

### 9.3 Biến môi trường cần thiết

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Clerk (Auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 9.4 CI/CD Pipeline

```
Developer pushes to GitHub
         │
         ▼
   GitHub Actions
   (Lint + Type Check + Tests)
         │
    ┌────▼────┐
    │  Pass?  │
    └────┬────┘
    Yes  │  No → Notify developer
         ▼
   Vercel Auto Deploy
         │
         ▼
   Preview URL generated
   (for PRs) / Production
   updated (for main)
```

---

## 10. Rủi Ro Và Giải Pháp

| Rủi ro | Xác suất | Mức độ | Giải pháp |
|--------|---------|--------|-----------|
| Chi phí OpenAI API vượt ngân sách | Trung bình | Cao | Ghi log mọi lượt gọi, giới hạn Free User 10 lần/tháng, cảnh báo khi sắp hết quota |
| Tốc độ AI phản hồi chậm | Cao | Trung bình | Dùng Streaming để UX vẫn tốt; thêm loading skeleton |
| Supabase downtime | Thấp | Cao | Thêm retry logic; hiển thị thông báo lỗi thân thiện |
| Rò rỉ API Key | Thấp | Rất cao | Không bao giờ expose key ra client; dùng server-side API routes |
| Người dùng spam gọi AI | Trung bình | Trung bình | Rate limiting theo user + IP; kiểm tra plan trước khi gọi |

---

## 11. Phụ Lục

### 11.1 Cấu trúc thư mục dự án

```
ai-seo-dashboard/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Sidebar + Navbar layout
│   │   ├── dashboard/page.tsx
│   │   ├── posts/
│   │   │   ├── page.tsx        # Post list
│   │   │   ├── new/page.tsx    # Create post
│   │   │   └── [id]/page.tsx   # Edit post
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── ai/generate/route.ts
│   │   ├── posts/route.ts
│   │   └── posts/[id]/route.ts
│   ├── layout.tsx
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Shadcn/ui components
│   ├── editor/
│   │   ├── TipTapEditor.tsx
│   │   └── EditorToolbar.tsx
│   ├── seo/
│   │   ├── SeoSidebar.tsx
│   │   └── SeoScore.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   └── Charts.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       └── Navbar.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── openai.ts
│   ├── seo-checker.ts          # SEO scoring logic
│   └── utils.ts
├── store/
│   └── ui.store.ts             # Zustand store
├── types/
│   └── index.ts                # Global TypeScript types
├── hooks/
│   ├── usePosts.ts             # TanStack Query hooks
│   └── useAI.ts
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### 11.2 SEO Scoring Algorithm

```typescript
interface SeoChecks {
  titleLength: boolean;       // 50–60 ký tự
  keywordInTitle: boolean;    // Từ khóa xuất hiện trong title
  keywordDensity: boolean;    // Mật độ 1–3%
  hasH2: boolean;             // Có ít nhất 1 thẻ H2
  minWordCount: boolean;      // ≥ 300 từ
  hasInternalLink: boolean;   // Có liên kết nội bộ
  metaDescriptionLength: boolean; // 120–160 ký tự
}

// Mỗi tiêu chí đạt = +14 điểm (7 tiêu chí × 14 = 98, làm tròn lên 100)
function calculateSeoScore(checks: SeoChecks): number {
  const passed = Object.values(checks).filter(Boolean).length;
  return Math.round((passed / Object.keys(checks).length) * 100);
}
```

### 11.3 Lịch sử phiên bản tài liệu

| Phiên bản | Ngày | Người thực hiện | Nội dung thay đổi |
|-----------|------|----------------|-------------------|
| 1.0.0 | 13/04/2026 | Nhóm phát triển | Tạo mới tài liệu SRS |

---

*Tài liệu này được soạn thảo dựa trên roadmap 5 giai đoạn phát triển AI-Powered SEO Dashboard.*  
*Mọi thay đổi cần được cập nhật vào bảng lịch sử phiên bản và thông báo cho các bên liên quan.*

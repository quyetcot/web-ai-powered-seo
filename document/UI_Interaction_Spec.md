# UI Interaction Specification
# AI SEO Dashboard — User Flow & Button Behaviors

> Tài liệu này mô tả hành vi của từng nút bấm / thành phần tương tác trên mỗi màn hình.
> Format: **[Tên nút]** → `Hành vi`

---

## 1. 🏠 Landing Page (`/`)

### Navbar
| Nút / Link | Hành vi |
|------------|---------|
| **Logo "AI SEO Dashboard"** | Scroll lên đầu trang (stay on `/`) |
| **Features** (nav link) | Scroll mượt đến section "Features" trên cùng trang |
| **Pricing** (nav link) | Scroll mượt đến section "Pricing" trên cùng trang |
| **Sign In** (ghost button) | Điều hướng → `/login` |
| **Get Started Free** (filled Indigo) | Điều hướng → `/register` |

### Hero Section
| Nút / Link | Hành vi |
|------------|---------|
| **Get Started Free** (CTA chính) | Điều hướng → `/register` |
| **Watch Demo →** (text link) | Mở modal video demo (hoặc scroll đến screenshots) |

### Pricing Section
| Nút / Link | Hành vi |
|------------|---------|
| **Start for Free** (Free plan) | Điều hướng → `/register` |
| **Upgrade to Pro** (Pro plan) | Điều hướng → `/register?plan=pro` |

### Footer
| Nút / Link | Hành vi |
|------------|---------|
| **Privacy Policy** | Điều hướng → `/privacy` (trang tĩnh) |
| **Terms of Service** | Điều hướng → `/terms` (trang tĩnh) |

---

## 2. 🔐 Login Page (`/login`)

| Nút / Link | Hành vi |
|------------|---------|
| **Continue with Google** | Mở OAuth popup Google → Nếu thành công → redirect `/dashboard` |
| **Sign In** (form button) | Validate email + password → Gọi Clerk auth → Thành công: redirect `/dashboard` → Thất bại: hiển thị lỗi "Invalid credentials" dưới form |
| **Forgot password?** | Điều hướng → `/forgot-password` (gửi email reset) |
| **Create a free account** (link) | Điều hướng → `/register` |
| **Remember me** (checkbox) | Session kéo dài 7 ngày (AUTH-04) |

### Trạng thái UI
| Tình huống | Hiển thị |
|------------|---------|
| Đang gọi API | Button "Sign In" chuyển sang loading spinner, disabled |
| Sai mật khẩu | Toast error đỏ: "Email hoặc mật khẩu không đúng" |
| Email chưa verify | Toast warning: "Vui lòng xác nhận email trước khi đăng nhập" |
| Đã đăng nhập | Auto-redirect → `/dashboard` (không hiển thị trang login) |

---

## 3. 📝 Register Page (`/register`)

| Nút / Link | Hành vi |
|------------|---------|
| **Continue with Google** | Google OAuth → Tạo tài khoản + profile → redirect `/dashboard` |
| **Create Account** (form button) | Validate tất cả fields → Gọi Clerk signup → Thành công: redirect `/dashboard` → Thất bại: hiển thị lỗi tương ứng |
| **Sign in** (footer link) | Điều hướng → `/login` |
| **Terms of Service** (link trong checkbox) | Mở tab mới → `/terms` |
| **Privacy Policy** (link trong checkbox) | Mở tab mới → `/privacy` |

### Validation real-time
| Field | Điều kiện | Hiển thị |
|-------|-----------|---------|
| Display Name | Trống | "Vui lòng nhập tên hiển thị" |
| Email | Sai format | "Email không hợp lệ" |
| Password | < 8 ký tự | Strength bar: Đỏ "Weak" |
| Password | 8-12 ký tự, mix | Strength bar: Vàng "Medium" |
| Password | 12+ ký tự, có số + ký tự đặc biệt | Strength bar: Xanh "Strong" |
| Checkbox Terms | Chưa tích | Button "Create Account" bị disabled |

---

## 4. 📊 Dashboard Overview (`/dashboard`)

### Left Sidebar
| Nút / Link | Hành vi |
|------------|---------|
| **Logo / App name** | Điều hướng → `/dashboard` |
| **Dashboard** (active) | Stay on `/dashboard` |
| **Posts** | Điều hướng → `/dashboard/posts` |
| **Analytics** | Điều hướng → `/dashboard/analytics` (Pro only — Free user thấy badge "Pro" + tooltip "Nâng cấp để dùng tính năng này") |
| **Settings** | Điều hướng → `/dashboard/settings` |
| **User avatar / name** (bottom) | Mở dropdown: "View Profile", "Settings", "Logout" |

### Top Navbar
| Nút / Link | Hành vi |
|------------|---------|
| **🔍 Search icon** | Mở search overlay / command palette |
| **🔔 Bell icon** | Mở dropdown thông báo (số badge biến mất khi đọc) |
| **🌙 Dark Mode toggle** | Toggle dark/light mode, lưu vào localStorage |
| **User avatar (top-right)** | Mở dropdown: Profile, Settings, Logout |
| **Logout** (trong dropdown) | Gọi Clerk signOut → redirect `/login` |

### Main Content
| Nút / Link | Hành vi |
|------------|---------|
| **"View All Posts →"** (link cuối bảng Recent Posts) | Điều hướng → `/dashboard/posts` |
| **Row trong Recent Posts table** (click) | Điều hướng → `/dashboard/posts/[id]` (mở editor bài đó) |
| **Card "AI Calls Used"** (khi Free user sắp hết) | Hiển thị tooltip: "Bạn đã dùng 8/10 lượt. Upgrade để dùng không giới hạn." + link Upgrade |

---

## 5. 📋 Posts Management (`/dashboard/posts`)

### Header
| Nút / Link | Hành vi |
|------------|---------|
| **+ Create New Post** | Gọi API `POST /api/posts` tạo bài trống → redirect `/dashboard/posts/[new-id]` |

### Toolbar
| Nút / Link | Hành vi |
|------------|---------|
| **Search input** | Filter danh sách theo `posts.title` (debounce 300ms, không reload trang) |
| **Status dropdown "All ▼"** | Filter: "All" / "Draft" / "Published" — cập nhật danh sách ngay lập tức |

### Data Table
| Nút / Link | Hành vi |
|------------|---------|
| **Row title (click)** | Điều hướng → `/dashboard/posts/[id]` |
| **✏️ Edit icon** | Điều hướng → `/dashboard/posts/[id]` |
| **📋 Duplicate icon** | Gọi API tạo bản copy của bài → Thêm row mới vào đầu danh sách, toast: "Đã tạo bản sao" |
| **🗑️ Delete icon** | Mở confirmation dialog: "Bài viết sẽ vào thùng rác và bị xóa vĩnh viễn sau 30 ngày. Xác nhận?" → Confirm: API soft-delete, cập nhật `posts.status = 'deleted'`, ẩn row khỏi danh sách |

### Pagination
| Nút / Link | Hành vi |
|------------|---------|
| **← Prev** | Load trang trước (10 bài trước đó) |
| **Số trang [1], [2]...** | Nhảy đến trang tương ứng |
| **Next →** | Load trang sau |

---

## 6. ✍️ Post Editor (`/dashboard/posts/[id]`)

### Top Header Bar
| Nút / Link | Hành vi |
|------------|---------|
| **← Back to Posts** | Điều hướng → `/dashboard/posts` (nếu có unsaved changes: hiển thị confirm dialog "Bạn có thay đổi chưa lưu. Rời trang?") |
| **Title input** (editable h1) | Typing → cập nhật `posts.title` trong local state → trigger SEO re-check |
| **Status dropdown "Draft ▼"** | Options: Draft / Published → thay đổi cập nhật `posts.status` |
| **"Auto-saving..."** indicator | Tự động xuất hiện mỗi 30 giây khi có thay đổi, gọi `PUT /api/posts/[id]` |
| **Save Draft** | Gọi `PUT /api/posts/[id]` ngay lập tức với status="draft" → toast: "✅ Đã lưu" |
| **Publish** (Indigo filled) | Nếu status là Draft: confirm dialog "Xuất bản bài viết?" → Confirm: cập nhật `status='published'`, `published_at=now()` → Button chuyển thành "Unpublish" |

### Editor Area (TipTap)
| Nút / Link | Hành vi |
|------------|---------|
| **B** (Bold) | Toggle bold cho text được select |
| **I** (Italic) | Toggle italic |
| **H1 / H2 / H3** | Chuyển đoạn hiện tại thành heading tương ứng |
| **List icon** | Chèn bullet list |
| **Ordered list** | Chèn numbered list |
| **Blockquote** | Chèn blockquote |
| **Link icon** | Mở popover nhập URL → Wrap selected text thành `<a>` tag |
| **Focus Keyword input** | Typing → cập nhật `posts.focus_keyword` → recalculate keyword density ngay lập tức trong SEO checklist |

### Floating AI Toolbar (bottom)
| Nút / Link | Hành vi |
|------------|---------|
| **🤖 Analyze SEO** | Gọi `POST /api/ai/generate` với nội dung bài, stream response vào "AI Suggestions" panel bên phải. Giảm `users.ai_calls_used` đi 1. Hiển thị animation "AI đang phân tích..." |
| **✨ Rewrite Section** | Highlight text được select → Gọi AI rewrite → Hiển thị text mới thay thế ngay trong editor (streaming) |
| **📝 Improve Intro** | Gọi AI với yêu cầu cải thiện phần intro → Streaming response |
| **(Khi Free user hết lượt AI)** | Tất cả AI buttons bị disabled + tooltip: "Bạn đã hết 10 lượt AI tháng này. Upgrade lên Pro." + link Upgrade |

### Right SEO Sidebar
| Nút / Link | Hành vi |
|------------|---------|
| **"Run AI Analysis"** button | Tương đương nút "🤖 Analyze SEO" — kích hoạt AI phân tích |
| **SEO Score ring** (visual) | Không có hành vi click, chỉ hiển thị score `posts.seo_score` cập nhật real-time |
| **Checklist items** (✅ ⚠️ ❌) | Hover để xem tooltip giải thích chi tiết điều kiện |
| **"AI Suggestions" panel** | Tự động scroll xuống khi AI trả về response streaming |

---

## 7. ⚙️ Settings (`/dashboard/settings`)

### Tab Navigation
| Tab | Hành vi |
|-----|---------|
| **Profile** | Hiển thị form Profile + Plan info |
| **API Keys** | Hiển thị form API Key management |
| **Preferences** | Hiển thị Dark Mode toggle + Notifications |

### Tab: Profile
| Nút / Link | Hành vi |
|------------|---------|
| **"Change Photo"** button | Mở file picker → Upload → Lưu vào Supabase Storage, cập nhật `users.avatar_url` |
| **"Save Changes"** | Gọi `PUT /api/users/profile` cập nhật `display_name` → toast: "✅ Đã lưu thông tin" |
| **"Upgrade to Pro"** button | Điều hướng → trang thanh toán / Stripe checkout |

### Tab: API Keys
| Nút / Link | Hành vi |
|------------|---------|
| **👁 Show/Hide icon** (API key input) | Toggle hiển thị/ẩn ký tự API key |
| **📋 Copy icon** | Copy API key vào clipboard → tooltip "Đã copy!" |
| **"Save API Key"** | Encrypt và lưu key → toast: "✅ API Key đã lưu" |
| **"Test Connection"** | Gọi thử OpenAI API với key vừa nhập → toast: "✅ Kết nối thành công" hoặc "❌ Key không hợp lệ" |

### Tab: Preferences
| Nút / Link | Hành vi |
|------------|---------|
| **Dark Mode toggle** | Toggle dark/light mode toàn app → lưu vào localStorage và `users` preferences |
| **Email notification toggles** | Lưu preference vào database |

### Danger Zone
| Nút / Link | Hành vi |
|------------|---------|
| **"Delete Account"** (red) | Mở modal xác nhận nguy hiểm: "Nhập email của bạn để xác nhận xóa tài khoản. Tất cả dữ liệu sẽ bị xóa vĩnh viễn." → Confirm: gọi API xóa user + cascade delete tất cả posts, ai_logs → Logout → redirect `/` |

---

## 8. 🔗 Global Navigation Flow

```
Landing (/)
    ├── Sign In → /login
    │       └── Success → /dashboard
    └── Get Started → /register
            └── Success → /dashboard

/dashboard ←──────────────────────┐
    ├── Posts → /dashboard/posts   │
    │     ├── Create → /dashboard/posts/[new-id]
    │     └── Edit row → /dashboard/posts/[id]
    │           └── ← Back ────────┘
    ├── Analytics → /dashboard/analytics
    └── Settings → /dashboard/settings

Sidebar "Logout" (bất kỳ trang nào) → /login
```

---

## 9. 🔔 Toast / Notification Messages

| Action | Toast |
|--------|-------|
| Save draft thành công | ✅ "Đã lưu bản nháp" |
| Publish thành công | ✅ "Bài viết đã được xuất bản" |
| Duplicate post | ✅ "Đã tạo bản sao" |
| Delete post | 🗑️ "Đã xóa. Khôi phục trong 30 ngày." |
| Save profile | ✅ "Đã lưu thông tin" |
| Save API Key | ✅ "API Key đã lưu" |
| Test connection thành công | ✅ "Kết nối thành công" |
| Test connection thất bại | ❌ "Key không hợp lệ" |
| AI hết lượt | ⚠️ "Đã hết 10 lượt AI tháng này. Upgrade lên Pro." |
| Copy to clipboard | 📋 "Đã copy!" (tooltip ngắn 1.5s) |

---

*Tài liệu này phản ánh luồng MVP theo SRS v1.0.0 ngày 13/04/2026.*
*Tham chiếu: `document/SRS_AI_SEO_Dashboard.md`*

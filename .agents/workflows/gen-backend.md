---
description: # Workflow: Generate Backend Code
---

# Workflow: Generate Backend Code

**Trigger:** `/gen-backend`  
**Mục đích:** Tạo code backend đầy đủ, production-ready cho các phần không liên quan đến React

---

## Bước 1 — Xác định loại backend cần tạo

Hỏi người dùng cần tạo loại nào:

```
Bạn cần generate phần nào?
1. API Route mới (Next.js /app/api)
2. Supabase SQL migration
3. Supabase RLS policy
4. Clerk middleware / auth config
5. OpenAI streaming endpoint
6. Environment variables setup
```

---

## Bước 2 — Thu thập thông tin

Tùy loại, hỏi thêm:
- **API Route:** Endpoint path? HTTP method? Input/output shape? Auth required?
- **SQL migration:** Bảng mới hay thêm cột? Relationship với bảng nào?
- **RLS:** Policy cho CRUD nào? User-owned hay public?
- **AI endpoint:** Prompt template? Streaming hay non-streaming?

---

## Bước 3 — Generate code

Cung cấp `[BACKEND - full code]` theo chuẩn:

```
## [BACKEND - full code] — {Tên chức năng}

### File: {đường dẫn đầy đủ}

```typescript
// Code đầy đủ ở đây
```

### Cách chạy / setup:
1. ...
2. ...

### Giải thích ngắn (3-5 dòng):
...
```

---

## Bước 4 — Checklist tự kiểm tra trước khi paste

Agent tự kiểm tra trước khi output:
- [ ] Auth check ở đầu API Route
- [ ] Error handling với try/catch
- [ ] Không lộ sensitive info trong response
- [ ] TypeScript types đầy đủ
- [ ] Input validation
- [ ] RLS được bật nếu là SQL

---

## Bước 5 — Hướng dẫn test

Sau khi cung cấp code, luôn thêm:
- Cách test endpoint (curl command hoặc dùng Thunder Client)
- Expected response khi thành công
- Expected response khi có lỗi auth
---
description: # Workflow: Review React Code
---



**Trigger:** `/review-react`  
**Mục đích:** Review code React/TSX mà người dùng tự viết, theo tiêu chí học React

---

## Bước 1 — Nhận code

Yêu cầu người dùng paste code cần review.  
Hỏi thêm: "Bạn đang cố làm gì với đoạn code này?"

---

## Bước 2 — Phân tích theo checklist

Kiểm tra từng tiêu chí sau (không nhất thiết phải tất cả, tùy context):

### TypeScript
- [ ] Props được type đầy đủ (interface hoặc type)
- [ ] Không dùng `any`
- [ ] Return type của hooks được infer đúng

### React fundamentals
- [ ] `"use client"` chỉ có khi cần thiết
- [ ] State không bị mutate trực tiếp
- [ ] useEffect có dependency array đúng
- [ ] Keys trong list là unique và stable (không dùng index nếu list có thể reorder)
- [ ] Không fetch data trong useEffect (dùng TanStack Query)

### Performance
- [ ] Function handlers không tạo mới mỗi render không cần thiết
- [ ] useMemo/useCallback chỉ dùng khi thực sự cần (không over-optimize)

### Naming & Structure
- [ ] Component name PascalCase
- [ ] Hook name bắt đầu bằng `use`
- [ ] Một component chỉ làm một việc (Single Responsibility)

---

## Bước 3 — Trả về feedback theo format chuẩn

```
## Review: [Tên component/hook]

### ✅ Làm tốt
- [điểm 1]
- [điểm 2]

### ⚠️ Cần sửa
**Vấn đề 1:** [mô tả]
```tsx
// Code hiện tại
...
// Gợi ý hướng sửa (không phải code hoàn chỉnh)
...
```

**Vấn đề 2:** ...

### 💡 Gợi ý nâng cao (không bắt buộc)
- [gợi ý 1 — nếu người dùng muốn đi sâu hơn]

### 📚 Concept liên quan để đọc thêm
- [link hoặc keyword để search]
```

---

## Bước 4 — Yêu cầu refactor

Sau khi nhận feedback, nói:  
> "Bạn thử sửa theo góp ý rồi paste lại nhé. Mình sẽ review lần 2."

**Không cung cấp code đã fix hoàn chỉnh ở bước này.**  
Chỉ cung cấp code fix nếu người dùng đã thử 2 lần mà vẫn stuck.
# Skill: AI Streaming Integration

**Mô tả:** Hướng dẫn implement tính năng gọi OpenAI với Streaming.  
Skill này load khi người dùng hỏi về AI integration, streaming, hoặc OpenAI API.

---

## Kiến trúc Streaming

```
[Client Button Click]
       ↓
useAI hook (CLIENT)
       ↓ fetch
/api/ai/generate (SERVER — API Route)
       ↓ stream
OpenAI API (GPT-4o)
       ↑ ReadableStream chunks
       ↑
useAI hook nhận chunks, update state từng chunk
       ↓
AI Response hiển thị "chảy" ra từng từ
```

---

## Phần 1: `/app/api/ai/generate/route.ts` (BACKEND — full code)

Agent sẽ generate full code khi trigger `/gen-backend` → chọn "OpenAI streaming endpoint".

Checklist code chuẩn:
- [ ] Auth check (Clerk `auth()`)
- [ ] Kiểm tra quota của user (bảng `users.ai_calls_used`)
- [ ] Gọi OpenAI với `stream: true`
- [ ] Return `ReadableStream`
- [ ] Ghi log vào `ai_logs` sau khi stream xong
- [ ] Update `users.ai_calls_used`

---

## Phần 2: `hooks/useAI.ts` (Custom Hook — React Learning)

Người dùng tự viết với hướng dẫn:

**Những gì hook cần làm:**
1. State: `response` (string), `isLoading` (boolean), `error` (string | null)
2. Function `analyzeContent(content, keyword)`:
   - Set loading = true
   - Fetch POST đến `/api/ai/generate`
   - Đọc stream từng chunk
   - Update `response` state mỗi khi có chunk mới
   - Set loading = false khi xong

**Phần khó nhất — đọc stream trong React:**
```
// Đây là concept mới hoàn toàn so với Vue
// Bạn cần hiểu: ReadableStream, TextDecoder, reader.read()

// Pseudocode để gợi ý:
const reader = response.body.getReader()
const decoder = new TextDecoder()

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  
  const chunk = decoder.decode(value)
  setResponse(prev => prev + chunk)  // Append, không replace!
}
```

**So sánh với Vue:**
```
// Trong Vue, bạn có thể dùng reactive + watch
// Trong React, bạn dùng setState với functional update
// prev => prev + chunk  ← đây là functional update pattern
// Tại sao cần? Vì state updates trong async context có thể stale
```

**Gợi ý interface:**
```typescript
interface UseAIReturn {
  response: string
  isLoading: boolean
  error: string | null
  analyzeContent: (content: string, keyword: string) => Promise<void>
  resetResponse: () => void
}
```

---

## Phần 3: UI Component cho AI Response

**Skeleton:**
```tsx
// Trong editor page hoặc AISidebar component
// Hiển thị response streaming với markdown rendering

// Gợi ý: dùng thư viện react-markdown để render markdown từ AI
// AI response sẽ là markdown format
```

**UX considerations:**
- Button "Analyze" → disabled khi isLoading
- Hiển thị spinner + "AI đang phân tích..." khi loading
- Response text nên có hiệu ứng "cursor nhấp nháy" khi đang stream
- Nếu error → hiển thị toast với thông báo lỗi

---

## Điểm học React từ feature này

1. **Async state management** — handling async operations with useState
2. **Functional state updates** — `setState(prev => ...)` pattern
3. **Cleanup trong async operations** — AbortController để cancel fetch
4. **useCallback cho handlers** — analyzeContent không cần recreate mỗi render
5. **Error boundaries** — handle lỗi network/API gracefully

---

## Quota management (UX pattern)

```tsx
// Gợi ý cho người dùng implement
// Component hiển thị quota còn lại
// useQuery để fetch quota từ API
// Disable button khi quota = 0
// Hiển thị upgrade prompt cho Free users
```
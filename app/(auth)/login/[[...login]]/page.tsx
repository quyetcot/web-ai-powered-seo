// [REACT - hướng dẫn]
// Trang này dùng component <SignIn /> của Clerk
// Clerk sẽ tự xử lý toàn bộ UI và logic đăng nhập

// Bước bạn cần làm:
// 1. Import SignIn từ @clerk/nextjs
// 2. Export một component default
// 3. Return <SignIn /> bên trong một wrapper div để căn giữa

// Gợi ý cấu trúc:
// function LoginPage() {
//   return (
//     <div className="???">   <-- bạn muốn căn giữa theo chiều nào?
//       <SignIn />
//     </div>
//   )
// }

// Tham khảo: https://clerk.com/docs/components/authentication/sign-in

import { SignIn } from "@clerk/nextjs";
import AuthWrapper from "../../../../components/layout/AuthWrapper";
export default function LoginPage() {
  // TODO: Bạn tự implement nhé!

  return (
    <AuthWrapper>
      <SignIn
        appearance={{
          variables: { colorPrimary: "#6366F1" },
        }}
      ></SignIn>
    </AuthWrapper>
  );
}

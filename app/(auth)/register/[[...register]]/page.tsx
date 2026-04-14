// [REACT - hướng dẫn]
// Tương tự trang Login nhưng dùng <SignUp /> của Clerk

// Bước bạn cần làm:
// 1. Import SignUp từ @clerk/nextjs
// 2. Export một component default
// 3. Return <SignUp /> bên trong wrapper div giống trang Login
import { SignUp } from "@clerk/nextjs";
import AuthWrapper from "../../../../components/layout/AuthWrapper";

export default function RegisterPage() {
  // TODO: Bạn tự implement nhé!

  return (
    <AuthWrapper>
      <SignUp
        appearance={{
          variables: { colorPrimary: "#6366F1" },
        }}
      ></SignUp>
    </AuthWrapper>
  );
}

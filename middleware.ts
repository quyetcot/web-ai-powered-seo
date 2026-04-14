import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes — không cần đăng nhập để truy cập
const isPublicRoute = createRouteMatcher([
  "/",              // Landing page
  "/login(.*)",     // Login page (với catch-all cho Clerk sub-routes)
  "/register(.*)",  // Register page
  "/api/webhook(.*)", // Clerk webhooks (nếu dùng sau này)
]);

export default clerkMiddleware(async (auth, request) => {
  // Nếu không phải public route → bắt buộc đăng nhập
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Bỏ qua các file tĩnh của Next.js và _next internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Luôn chạy middleware cho API routes
    "/(api|trpc)(.*)",
  ],
};

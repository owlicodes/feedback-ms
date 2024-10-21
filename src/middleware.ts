import { authMiddleware } from "better-auth/next-js";

export default authMiddleware({
  redirectTo: "/auth/sign-in",
});

export const config = {
  matcher: ["/admin/:path*"],
};

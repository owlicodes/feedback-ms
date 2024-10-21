import { authMiddleware } from "better-auth/next-js";

export default authMiddleware({
  redirectTo: "/auth/sign-up",
});

export const config = {
  matcher: ["/admin/:path*"],
};

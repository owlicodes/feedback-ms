import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const client = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
  plugins: [adminClient()],
});

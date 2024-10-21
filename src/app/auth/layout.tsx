import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-[500px]">{children}</div>
    </div>
  );
}

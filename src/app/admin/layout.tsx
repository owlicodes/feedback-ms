import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppAlertDialog } from "@/components/app-alert-dialog";
import { AppSheet } from "@/components/app-sheet";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <AppSheet />
        <AppAlertDialog />
        <div className="w-full p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}

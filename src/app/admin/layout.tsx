import { AppSheet } from "@/components/app-sheet";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <AppSheet />
          <div className="w-full p-4">{children}</div>
        </main>
      </SidebarProvider>
    </QueryProvider>
  );
}

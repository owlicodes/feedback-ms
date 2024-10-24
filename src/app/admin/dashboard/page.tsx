import { AppPageHeader } from "@/components/app-page-header";
import { Dashboard } from "@/features/admin/dashboards/dashboard";

export default function DashboardPage() {
  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
      </AppPageHeader>
      <div>
        <Dashboard />
      </div>
    </div>
  );
}

import { Dashboard } from "@/features/admin/dashboard";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Dashboard />
      <SignOutButton />
    </div>
  );
}

import { DashboardDonutChart } from "./dashboard-donut-chart";
import { DashboardTopCards } from "./dashboard-top-cards";

export const Dashboard = async () => {
  return (
    <div className="space-y-4">
      <DashboardTopCards />
      <DashboardDonutChart />
    </div>
  );
};

import { DashboardBarChart } from "./dashboard-bar-chart";
import { DashboardDonutChart } from "./dashboard-donut-chart";
import { DashboardTopCards } from "./dashboard-top-cards";

export const Dashboard = async () => {
  return (
    <div className="space-y-4">
      <DashboardTopCards />
      <div className="flex gap-8">
        <div className="flex-1">
          <DashboardDonutChart />
        </div>
        <div className="flex-1">
          <DashboardBarChart />
        </div>
      </div>
    </div>
  );
};

"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { roadmap: "pending", count: 200, fill: "var(--color-pending)" },
  { roadmap: "inprogress", count: 275, fill: "var(--color-inprogress)" },
  { roadmap: "resolved", count: 187, fill: "var(--color-resolved)" },
];

const chartConfig = {
  counts: {
    label: "Counts",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  inprogress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export const DashboardBarChart = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Roadmaps</CardTitle>
        <CardDescription>
          Showing the count for all available roadmaps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 5,
            }}
          >
            <YAxis
              dataKey="roadmap"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

"use client";

import { Loader } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useBarData } from "./apis/use-bar-data";

export const DashboardBarChart = () => {
  const chartData = useBarData();

  if (chartData.isLoading) {
    return (
      <Card className="flex w-full items-center justify-center p-4">
        <Loader className="h-4 w-4 animate-spin" />
      </Card>
    );
  }

  if (!chartData.data) {
    return (
      <Card className="flex w-full items-center justify-center p-4">
        <p>Nothing display at the moment.</p>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Roadmaps</CardTitle>
        <CardDescription>
          Showing the count for all available roadmaps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartData.data.chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData.data.chartData}
            layout="vertical"
            margin={{
              left: 16,
            }}
          >
            <YAxis
              dataKey="roadmap"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartData.data.chartConfig[
                  value as keyof typeof chartData.data.chartConfig
                ]?.label
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

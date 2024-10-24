"use client";

import * as React from "react";

import { Loader } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

import { useChartData } from "./apis/use-chart-data";

export const DashboardDonutChart = () => {
  const chartData = useChartData();

  const totalFeedbacks = React.useMemo(() => {
    if (chartData.data?.chartData) {
      return chartData.data.chartData.reduce(
        (acc, curr) => acc + curr.feedbacks,
        0
      );
    }

    return 0;
  }, [chartData.data]);

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
    <Card className="flex h-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Board Feedbacks</CardTitle>
        <CardDescription>Total feedbacks per board</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartData.data.chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.data?.chartData}
              dataKey="feedbacks"
              nameKey="board"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalFeedbacks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Feedbacks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

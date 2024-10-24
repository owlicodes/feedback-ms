import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TChartData = {
  board: string;
  feedbacks: number;
  fill: string;
};

type TChartConfig = {
  [key: string]: {
    label: string;
    color?: string;
  };
};

const getChartData = (): Promise<{
  chartData: Array<TChartData>;
  chartConfig: TChartConfig;
}> => {
  return axios
    .get("/api/dashboard")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useChartData = () => {
  return useQuery({
    queryKey: ["dashboard", "chart-data"],
    queryFn: getChartData,
  });
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TChartData = {
  roadmap: string;
  count: number;
  fill: string;
};

type TChartConfig = {
  [key: string]: {
    label: string;
    color?: string;
  };
};

const getBarData = (): Promise<{
  chartData: Array<TChartData>;
  chartConfig: TChartConfig;
}> => {
  return axios
    .get("/api/dashboard/bar")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useBarData = () => {
  return useQuery({
    queryKey: ["dashboard", "bar-data"],
    queryFn: getBarData,
  });
};

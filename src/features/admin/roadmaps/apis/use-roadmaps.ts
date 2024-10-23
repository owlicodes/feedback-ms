import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Roadmap } from "../types";

const getRoadmaps = (): Promise<Roadmap[]> => {
  return axios
    .get("/api/roadmap")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: getRoadmaps,
  });
};

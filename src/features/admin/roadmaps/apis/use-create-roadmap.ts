import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CreateRoadmap } from "../types";

const createRoadmap = (data: CreateRoadmap): Promise<{ message: string }> => {
  return axios
    .post("/api/roadmap", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateRoadmap = () => {
  return useMutation({
    mutationFn: createRoadmap,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UpdateRoadmap } from "../types";

const updateRoadmap = ({
  id,
  data,
}: {
  id: string;
  data: UpdateRoadmap;
}): Promise<{ message: string }> => {
  return axios
    .patch(`/api/roadmap/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateRoadmap = () => {
  return useMutation({
    mutationFn: updateRoadmap,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

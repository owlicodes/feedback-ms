import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteRoadmap = (id: string): Promise<{ message: string }> => {
  return axios
    .delete(`/api/roadmap/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteRoadmap = () => {
  return useMutation({
    mutationFn: deleteRoadmap,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

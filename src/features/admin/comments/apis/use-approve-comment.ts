import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const approveComment = (id: string): Promise<{ message: string }> => {
  return axios
    .patch(`/api/comment/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useApproveComment = () => {
  return useMutation({
    mutationFn: approveComment,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

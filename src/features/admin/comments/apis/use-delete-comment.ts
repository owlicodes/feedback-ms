import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteComment = (id: string): Promise<{ message: string }> => {
  return axios
    .delete(`/api/comment/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

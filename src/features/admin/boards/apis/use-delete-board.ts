import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteBoard = (id: string): Promise<{ message: string }> => {
  return axios
    .delete(`/api/board/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteBoard = () => {
  return useMutation({
    mutationFn: deleteBoard,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

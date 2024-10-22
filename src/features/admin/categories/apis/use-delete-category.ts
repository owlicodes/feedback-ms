import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteCategory = (id: string): Promise<{ message: string }> => {
  return axios
    .delete(`/api/category/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

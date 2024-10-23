import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteFeedback = (id: string): Promise<{ message: string }> => {
  return axios
    .delete(`/api/feedback/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteFeedback = () => {
  return useMutation({
    mutationFn: deleteFeedback,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

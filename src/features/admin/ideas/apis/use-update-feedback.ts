import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UpdateFeedback } from "../types";

const updateFeedback = ({
  id,
  data,
}: {
  id: string;
  data: UpdateFeedback;
}): Promise<{ message: string }> => {
  return axios
    .patch(`/api/feedback/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateFeedback = () => {
  return useMutation({
    mutationFn: updateFeedback,
    onError: (error: { message: string }) => error,
  });
};

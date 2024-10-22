import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CreateFeedback } from "../types";

const createFeedback = (data: CreateFeedback): Promise<{ message: string }> => {
  return axios
    .post("/api/feedback", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateFeedback = () => {
  return useMutation({
    mutationFn: createFeedback,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

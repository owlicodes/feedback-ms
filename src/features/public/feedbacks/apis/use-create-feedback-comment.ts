import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CreateComment } from "../types";

const createComment = ({
  feedbackId,
  data,
}: {
  feedbackId: string;
  data: CreateComment;
}): Promise<{ message: string }> => {
  return axios
    .post(`/api/comment/${feedbackId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateFeedbackComment = () => {
  return useMutation({
    mutationFn: createComment,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

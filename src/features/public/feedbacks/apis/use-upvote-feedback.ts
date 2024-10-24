import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { TCreateUpvote } from "../types";

const upvoteFeedback = (data: TCreateUpvote): Promise<{ message: string }> => {
  return axios
    .post("/api/upvote", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpvoteFeedback = () => {
  return useMutation({
    mutationFn: upvoteFeedback,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

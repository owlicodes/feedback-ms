import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { TCreateUpvote } from "../types";
import { queryKeys } from "./use-board-feedbacks";

const upvoteFeedback = (data: TCreateUpvote): Promise<{ message: string }> => {
  return axios
    .post("/api/upvote", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpvoteFeedback = (boardId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upvoteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.byBoardId(boardId),
      });
    },
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

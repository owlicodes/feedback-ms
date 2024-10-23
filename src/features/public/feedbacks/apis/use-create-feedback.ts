import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { CreateFeedback } from "../types";
import { queryKeys } from "./use-board-feedbacks";

const createFeedback = (data: CreateFeedback): Promise<{ message: string }> => {
  return axios
    .post("/api/feedback", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateFeedback = (boardId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeedback,
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

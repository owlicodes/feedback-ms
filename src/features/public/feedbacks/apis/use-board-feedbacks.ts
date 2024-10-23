import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FeedbackData } from "../types";

const getBoardFeedbacks = (
  boardId: string | undefined
): Promise<FeedbackData[]> => {
  return axios
    .get(`/api/feedback/board/${boardId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useBoardFeedbacks = (boardId: string | undefined) => {
  return useQuery({
    enabled: Boolean(boardId),
    queryKey: ["feedbacks", "boards", boardId],
    queryFn: () => getBoardFeedbacks(boardId),
  });
};

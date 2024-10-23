import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FeedbackData } from "../types";

export const queryKeys = {
  root: ["feedback"],
  byBoardId: (boardId: string | undefined) => [
    ...queryKeys.root,
    "board",
    boardId,
  ],
};

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
    queryKey: queryKeys.byBoardId(boardId),
    queryFn: () => getBoardFeedbacks(boardId),
  });
};

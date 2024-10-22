import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UpdateBoard } from "../types";

const updateBoard = ({
  id,
  data,
}: {
  id: string;
  data: UpdateBoard;
}): Promise<{ message: string }> => {
  return axios
    .patch(`/api/board/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateBoard = () => {
  return useMutation({
    mutationFn: updateBoard,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

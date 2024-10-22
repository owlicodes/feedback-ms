import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CreateBoard } from "../types";

const createBoard = (data: CreateBoard): Promise<{ message: string }> => {
  return axios
    .post("/api/board", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateBoard = () => {
  return useMutation({
    mutationFn: createBoard,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

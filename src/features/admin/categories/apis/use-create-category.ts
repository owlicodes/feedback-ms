import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CreateCategory } from "../types";

const createCategory = (data: CreateCategory): Promise<{ message: string }> => {
  return axios
    .post("/api/category", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

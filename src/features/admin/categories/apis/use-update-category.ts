import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UpdateCategory } from "../types";

const updateCategory = ({
  id,
  data,
}: {
  id: string;
  data: UpdateCategory;
}): Promise<{ message: string }> => {
  return axios
    .patch(`/api/category/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategory,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};

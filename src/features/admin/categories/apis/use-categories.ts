import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Category } from "../types";

const getCategories = (): Promise<Category[]> => {
  return axios
    .get("/api/category")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

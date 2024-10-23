import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Board } from "../types";

const getBoards = (): Promise<Board[]> => {
  return axios
    .get("/api/board")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Feedback } from "../types";

const getFeedbackDetails = (id: string): Promise<Feedback> => {
  return axios
    .get(`/api/feedback/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useFeedbackDetails = (id: string) => {
  return useQuery({
    queryKey: ["feedback", id],
    queryFn: () => getFeedbackDetails(id),
  });
};

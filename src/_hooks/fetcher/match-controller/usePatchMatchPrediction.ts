"use client";

import patchMatchPrediction, {
  PatchPreditonData,
} from "@/services/match-controller/patchMatchPrediction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchMatchPrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PatchPreditonData) => patchMatchPrediction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchPrediction"] });
    },
  });
};

export default usePatchMatchPrediction;

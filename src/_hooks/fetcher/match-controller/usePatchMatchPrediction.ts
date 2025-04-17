"use client";

import { useToast } from "@/_hooks/useToast";
import patchMatchPrediction, {
  PatchPreditonData,
} from "@/services/match-controller/patchMatchPrediction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const usePatchMatchPrediction = () => {
  const queryClient = useQueryClient();
  const { error: toastError } = useToast();

  return useMutation({
    mutationFn: (data: PatchPreditonData) => patchMatchPrediction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchPrediction"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toastError("투표는 한 번만 가능합니다.", "");
      }
    },
  });
};

export default usePatchMatchPrediction;

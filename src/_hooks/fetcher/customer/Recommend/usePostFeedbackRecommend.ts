"use client";

import { useToast } from "@/_hooks/useToast";
import postFeedbackRecommend from "@/services/customer/Recommend/postFeedbackRecommend";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostFeedbackRecommend = () => {
  const { success, error: toastError } = useToast();

  const mutation = useMutation({
    mutationFn: (feedbackId: number) => postFeedbackRecommend(feedbackId),
    retry: 1,
    onSuccess: () => {
      success("추천이 완료되었습니다.", "");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toastError("개선요청 추천 실패", errorMessage);
      } else {
        toastError(
          "개선요청 추천 실패",
          "개선요청 추천 중 오류가 발생했습니다."
        );
      }
    },
  });

  return { ...mutation };
};

export default usePostFeedbackRecommend;

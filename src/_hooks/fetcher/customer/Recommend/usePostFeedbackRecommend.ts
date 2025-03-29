"use client"

import { useToast } from "@/_hooks/useToast";
import postFeedbackRecommend from "@/services/customer/Recommend/postFeedbackRecommend";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const usePostFeedbackRecommend = () => {
  const toast = useToast();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  
  const mutation = useMutation({
    mutationFn: (feedbackId: number) => postFeedbackRecommend(feedbackId),
    retry: 1,
    onSuccess: () => {
      toast.success("추천이 완료되었습니다.", "")
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setIsSignInModalOpen(true);
        return;
      }

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("개선요청 추천 실패", errorMessage);
      } else {
        toast.error("개선요청 추천 실패", "개선요청 추천 중 오류가 발생했습니다.");
      }
    },
  });

  return { ...mutation, isSignInModalOpen, setIsSignInModalOpen };
};

export default usePostFeedbackRecommend;
"use client";

import { useToast } from "@/_hooks/useToast";
import patchNewsRecommend from "@/services/news/patchNewsRecommend";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePatchRecommend = () => {
  const { success, error: toastError } = useToast();

  const mutation = useMutation({
    mutationFn: (newsId: string) => patchNewsRecommend(newsId),
    retry: 1,
    onSuccess: () => {
      success("뉴스 추천이 완료되었습니다.", "");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toastError("뉴스 추천 실패", errorMessage);
      } else {
        toastError("뉴스 추천 실패", "뉴스 추천 중 오류가 발생했습니다.");
      }
    },
  });

  return { ...mutation };
};

export default usePatchRecommend;

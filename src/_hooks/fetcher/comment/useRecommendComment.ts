"use client";

import recommendComment from "@/services/mypage/recommendComment";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";

const useRecommendComment = () => {
  const { success } = useToast();

  return useMutation({
    mutationFn: (commentId: number) => recommendComment(commentId),
    onSuccess: () => {
      success("추천이 완료되었습니다.", "");
    },
  });
};

export default useRecommendComment;

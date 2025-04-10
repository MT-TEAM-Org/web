"use client";

import recommendComment from "@/services/mypage/recommendComment";
import { useMutation } from "@tanstack/react-query";

const useRecommendComment = () => {
  return useMutation({
    mutationFn: (commentId: number) => recommendComment(commentId),
  });
};

export default useRecommendComment;

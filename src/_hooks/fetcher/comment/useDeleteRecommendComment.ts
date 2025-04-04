"use client";

import deleteRecommendComment from "@/services/mypage/deleteRecommendComment";
import { useMutation } from "@tanstack/react-query";

const useDeleteRecommendComment = () => {
  return useMutation({
    mutationFn: (commentId: number) => deleteRecommendComment(commentId),
  });
};

export default useDeleteRecommendComment;

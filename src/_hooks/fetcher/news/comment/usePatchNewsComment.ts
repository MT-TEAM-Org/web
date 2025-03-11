import patchNewsComment from "@/services/news/comment/patchNewsComment";
import { useMutation } from "@tanstack/react-query";

const usePatchCommentRecommend = () => {
  return useMutation({
    mutationFn: (newsCommentId: number) => patchNewsComment(newsCommentId),
    retry: 1,
    onSuccess: () => {
      console.log("댓글 추천 성공");
    },
    onError: (error: any) => {
      console.error("댓글 추천 실패:", error);
    },
  });
};

export default usePatchCommentRecommend;
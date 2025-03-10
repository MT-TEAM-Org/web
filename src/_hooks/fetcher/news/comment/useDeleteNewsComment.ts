import deleteNewsComment from "@/services/news/comment/deleteNewsComment";
import { useMutation } from "@tanstack/react-query";

const useDeleteCommentRecommend = () => {
  return useMutation({
    mutationFn: (newsCommentId: number) => deleteNewsComment(newsCommentId),
    retry: 1,
    onSuccess: () => {
      console.log("댓글 추천 취소 성공");
    },
    onError: (error: any) => {
      console.error("댓글 추천 취소 실패:", error);
    },
  });
};

export default useDeleteCommentRecommend;
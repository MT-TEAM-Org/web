import deleteComment from "@/services/news/comment/deleteComment";
import { useMutation } from "@tanstack/react-query";

const useDeleteCommentRecommend = () => {
  return useMutation({
    mutationFn: (newsCommentId: number) => deleteComment(newsCommentId),
    retry: 1,
    onSuccess: () => {
      console.log("댓글 삭제 성공");
    },
    onError: (error: Error) => {
      console.error("댓글 삭제 실패:", error);
    },
  });
};

export default useDeleteCommentRecommend;
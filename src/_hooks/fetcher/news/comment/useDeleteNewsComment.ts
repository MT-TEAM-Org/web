import { useToast } from "@/_hooks/useToast";
import deleteNewsComment from "@/services/news/comment/deleteNewsComment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useDeleteCommentRecommend = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (newsCommentId: number) => deleteNewsComment(newsCommentId),
    retry: 1,
    onSuccess: () => {
      toast.success("댓글 추천 삭제 성공", "댓글 추천이 삭제되었습니다.")
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("댓글 추천 삭제 실패", errorMessage);
      } else {
        toast.error("댓글 추천 삭제 실패", "댓글 추천 삭제 중 오류가 발생했습니다.");
      }
    },
  });
};

export default useDeleteCommentRecommend;
import { useToast } from "@/_hooks/useToast";
import patchNewsComment from "@/services/news/comment/patchNewsComment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePatchCommentRecommend = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (newsCommentId: number) => patchNewsComment(newsCommentId),
    retry: 1,
    onSuccess: () => {
      toast.success("댓글 추천 성공", "댓글 추천 성공했습니다.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("댓글 추천 실패", errorMessage);
      } else {
        toast.error("댓글 추천 실패", "댓글 추천 중 오류가 발생했습니다.");
      }
    },
  });
};

export default usePatchCommentRecommend;
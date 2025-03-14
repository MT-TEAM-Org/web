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
      console.log("댓글 추천 취소 성공");
      toast.success("추천 삭제 성공", "추천이 삭제되었습니다.")
    },
    onError: (error: Error) => {
      if(axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("추천 삭제 실패", "로그인이 필요한 서비스입니다.")
      }
    },
  });
};

export default useDeleteCommentRecommend;
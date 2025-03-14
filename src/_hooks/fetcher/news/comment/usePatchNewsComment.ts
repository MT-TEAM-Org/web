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
    onError: (error: any) => {
      if(axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("댓글 추천 실패", "로그인이 필요한 서비스입니다.");
      }
    },
  });
};

export default usePatchCommentRecommend;
import { useToast } from "@/_hooks/useToast";
import postNewsComment from "@/services/news/comment/postNewsComment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostComment = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ newsId, comment, imgUrl }: { newsId: number; comment: string; imgUrl: string }) =>
      postNewsComment({ newsId, comment, imgUrl }),
    retry: 1,
    onSuccess: () => {
      toast.success("댓글 추가 성공", "댓글 추가 성공")
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("댓글 추가 실패", "로그인이 필요한 서비스입니다.")
      }
    },
  });
};

export default usePostComment;
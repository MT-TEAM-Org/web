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
      toast.success("댓글 추가 성공", "")
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("댓글 추가 실패", errorMessage);
      } else {
        toast.error("댓글 추가 실패", "댓글 추가 중 오류가 발생했습니다.");
      }
    },
  });
};

export default usePostComment;
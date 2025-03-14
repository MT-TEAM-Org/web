import { useToast } from "@/_hooks/useToast";
import deleteComment from "@/services/news/comment/deleteComment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useCommentDelete = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (newsCommentId: number) => deleteComment(newsCommentId),
    retry: 1,
    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다.", "");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("댓글 삭제 실패", errorMessage);
      } else {
        toast.error("댓글 삭제 실패", "댓글 삭제 중 오류가 발생했습니다.");
      }
    },
  });
};

export default useCommentDelete;
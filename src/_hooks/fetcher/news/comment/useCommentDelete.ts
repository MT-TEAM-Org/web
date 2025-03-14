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
      toast.success("댓글 삭제 완료", "댓글이 삭제되었습니다.");
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error("댓글 삭제 실패", "새로고침 해주세요!");
      }
    },
  });
};

export default useCommentDelete;
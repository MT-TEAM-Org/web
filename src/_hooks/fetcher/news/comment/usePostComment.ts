import { useToast } from "@/_hooks/useToast";
import postNewsComment from "@/services/news/comment/postNewsComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const usePostComment = (id: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ newsId, comment, imgUrl }: { newsId: number; comment: string; imgUrl: string }) =>
      postNewsComment({ newsId, comment, imgUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNewsComment", String(id)],
      });
      queryClient.invalidateQueries({
        queryKey: ["getNewsInfo", String(id)],
      });
      queryClient.refetchQueries({
        queryKey: ["getBestComment", Number(id)],
      });
      toast.success("댓글 입력이 완료되었습니다.", "")
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("댓글 입력 실패", errorMessage);
      } else {
        toast.error("댓글 입력 실패", "댓글 입력 중 오류가 발생했습니다.");
      }
    },
  });
};

export default usePostComment;
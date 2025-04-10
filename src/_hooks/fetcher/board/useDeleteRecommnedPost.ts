import { useToast } from "@/_hooks/useToast";
import deleteRecommendPost from "@/services/board/deleteRecommendPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteRecommendPost = ({ boardId }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecommendPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "detail", boardId] });
      toast.success("추천이 취소되었습니다.", "");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("게시글 삭제 실패", errorMessage);
      }
    },
  });
};

export default useDeleteRecommendPost;

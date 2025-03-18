import { useToast } from "@/_hooks/useToast";
import postRecommend from "@/services/board/postRecommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const usePostRecommend = ({ boardId }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: postRecommend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "detail", boardId] });
      toast.success("추천 성공", "게시글이 추천되었습니다.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("추천 실패", errorMessage);
      }
    },
  });
};

export default usePostRecommend;

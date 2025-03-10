import deleteRecommendPost from "@/services/board/deleteRecommendPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteRecommendPost = ({ boardId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecommendPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "detail", boardId] });
    },
  });
};

export default useDeleteRecommendPost;

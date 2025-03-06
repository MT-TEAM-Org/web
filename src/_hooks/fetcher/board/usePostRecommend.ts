import postRecommend from "@/services/board/postRecommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostRecommend = ({ boardId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRecommend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "detail", boardId] });
    },
  });
};

export default usePostRecommend;

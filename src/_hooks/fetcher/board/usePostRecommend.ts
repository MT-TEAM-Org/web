import postRecommend from "@/services/board/postRecommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const usePostRecommend = ({ boardId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRecommend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "detail", boardId] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.");
      }
    },
  });
};

export default usePostRecommend;

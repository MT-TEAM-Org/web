import deleteNewsRecommend from "@/services/news/deleteNewsRecommend";
import { useMutation } from "@tanstack/react-query";

const useDeleteRecommend = () => {
  return useMutation({
    mutationFn: (newsId: string) => deleteNewsRecommend(newsId),
    retry: 1,
    onError: (error) => {
      console.error("추천 삭제 실패:", error.message);
    },
  });
};

export default useDeleteRecommend;
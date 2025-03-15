import { useToast } from "@/_hooks/useToast";
import deleteNewsRecommend from "@/services/news/deleteNewsRecommend";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useDeleteRecommend = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (newsId: string) => deleteNewsRecommend(newsId),
    retry: 1,
    onSuccess: () => {
      toast.success("뉴스 추천이 삭제되었습니다.", "")
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("뉴스 추천 삭제 실패", errorMessage);
      } else {
        toast.error("뉴스 추천 삭제 실패", "뉴스 추천 삭제 중 오류가 발생했습니다.");
      }
    },
  });
};

export default useDeleteRecommend;
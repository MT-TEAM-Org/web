import patchNewsRecommend from "@/services/news/patchNewsRecommend";
import { useMutation } from "@tanstack/react-query";

const usePatchRecommend = () => {
  return useMutation({
    mutationFn: (newsId: string) => patchNewsRecommend(newsId),
    retry: 1,
    onSuccess: () => {
      console.log("추천 추가 성공");
    }
  });
};

export default usePatchRecommend;
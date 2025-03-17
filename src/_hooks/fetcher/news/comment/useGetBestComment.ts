import getBestComment from "@/services/news/comment/getBestComment";
import { useQuery } from "@tanstack/react-query";

const useGetBestComment = (newsId: string) => {
  return useQuery({
    queryKey: ["getBestComment", newsId],
    queryFn: () => getBestComment(newsId),
    retry: 1,
  });
};

export default useGetBestComment;
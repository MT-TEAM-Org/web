import getNewsComment from "@/services/news/getNewsComment";
import { useQuery } from "@tanstack/react-query";

const useGetNewsComment = (newsId: string) => {
  return useQuery({
    queryKey: ["getNewsComment", newsId],
    queryFn: () => getNewsComment({newsId}),
    retry: 1,
  });
};

export default useGetNewsComment;
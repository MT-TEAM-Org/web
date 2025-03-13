import getNewsComment from "@/services/news/comment/getNewsComment";
import { useQuery } from "@tanstack/react-query";

const useGetNewsComment = (id: string) => {
  return useQuery({
    queryKey: ["getNewsComment", id],
    queryFn: () => getNewsComment({id}),
    retry: 1,
  });
};

export default useGetNewsComment;
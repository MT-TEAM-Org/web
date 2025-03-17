import getBestComment from "@/services/news/comment/getBestComment";
import { useQuery } from "@tanstack/react-query";

const useGetBestComment = (id: string) => {
  return useQuery({
    queryKey: ["getBestComment", id],
    queryFn: () => getBestComment(id),
    retry: 1,
  });
};

export default useGetBestComment;
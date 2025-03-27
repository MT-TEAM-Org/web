import getCommentList from "@/services/comment/getCommentList";
import { useQuery } from "@tanstack/react-query";
import { CommentType } from "@/_types/comment";

const useGetCommentList = (id: string, type: CommentType, page: number) => {
  return useQuery({
    queryKey: ["commentList", type, id, page],
    queryFn: () => getCommentList({ id, type, page }),
    enabled: !!id,
  });
};

export default useGetCommentList;

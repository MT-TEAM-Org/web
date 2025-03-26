import getCommentList from "@/services/comment/getCommentList";
import { useQuery } from "@tanstack/react-query";
import { CommentType } from "@/_types/comment";

const useGetCommentList = (id: string, type: CommentType, enabled = true) => {
  return useQuery({
    queryKey: ["commentList", type, id],
    queryFn: () => getCommentList({ id, type }),
    enabled,
  });
};

export default useGetCommentList;

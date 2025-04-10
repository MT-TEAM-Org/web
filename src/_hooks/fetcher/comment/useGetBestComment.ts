import { CommentType } from "@/_types/comment";
import getBestComment from "@/services/comment/getBestComment";
import { useQuery } from "@tanstack/react-query";

interface BestCommentData {
  id: string;
  type: CommentType;
}

const useGetBestComment = (data: BestCommentData) => {
  return useQuery({
    queryKey: ["bestComment", data],
    queryFn: () => getBestComment(data),
    enabled: !!data.id,
  });
};

export default useGetBestComment;

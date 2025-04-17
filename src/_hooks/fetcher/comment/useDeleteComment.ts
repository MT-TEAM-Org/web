import { CommentType } from "@/_types/comment";
import deleteComment from "@/services/comment/deleteComment";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteCommentData {
  commentId: string;
  type: CommentType;
}

const useDeleteComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteCommentData) => deleteComment({ id, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCommentList"] });
    },
  });
};

export default useDeleteComment;

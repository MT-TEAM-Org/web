import { CommentType } from "@/_types/comment";
import deleteComment from "@/services/comment/deleteComment";
import { useMutation } from "@tanstack/react-query";

interface DeleteCommentData {
  commentId: string;
  type: CommentType;
}

const useDeleteComment = (id: string) => {
  return useMutation({
    mutationFn: (data: DeleteCommentData) => deleteComment({ id, ...data }),
  });
};

export default useDeleteComment;

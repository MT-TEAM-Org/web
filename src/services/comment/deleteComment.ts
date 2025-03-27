import axios from "axios";
import { CommentType } from "@/_types/comment";

interface DeleteCommentData {
  id: string;
  commentId: string;
  type: CommentType;
}

const deleteComment = async (deleteCommentData: DeleteCommentData) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/${deleteCommentData.id}/comment/${deleteCommentData.commentId}`,
    {
      params: {
        type: deleteCommentData.type,
      },
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default deleteComment;

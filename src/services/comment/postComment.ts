import axios from "axios";
import { PostCommentData } from "@/_types/comment";

const postComment = async (data: PostCommentData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/${data.id}/comment`,
    {
      type: data.type,
      comment: data.comment,
      imageUrl: data.imageUrl,
      parentId: data.parentId,
      mentionedPublicId: data.mentionedPublicId,
    },
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default postComment;

import axios from "axios";
import { CommentType } from "@/_types/comment";

interface BestCommentData {
  id: string;
  type: CommentType;
}

const getBestComment = async (data: BestCommentData) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/${data.id}/best`,
    {
      params: {
        page: 1,
        size: 3,
        type: data.type,
      },
    }
  );
  return response.data;
};

export default getBestComment;

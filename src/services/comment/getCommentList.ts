import axios from "axios";
import { CommentType } from "@/_types/comment";

interface CommentData {
  id: string;
  type: CommentType;
}

const getCommentList = async (data: CommentData) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/${data.id}`,
    {
      params: { page: 1, size: 10, type: data.type },
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export default getCommentList;

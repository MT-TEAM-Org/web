import { apiRequest } from "@/services/instant";

interface PostNewsCommentProps {
  newsId: number;
  comment: string;
  imgUrl: string;
}

const postNewsComment = async ({ newsId, comment, imgUrl }: PostNewsCommentProps) => {
  const token = localStorage.getItem("accessToken");

  const response = await apiRequest.post(
    `api/news/comment`, 
    {
      newsId,
      comment,
      imgUrl
    },
    {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    }
  );
  return response;
};

export default postNewsComment;
import { apiRequest } from "@/services/instant";

const deleteComment = async (newsCommentId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await apiRequest.delete(
    `/api/news/comment/${newsCommentId}`,
    {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    }
  );
  return response;
};

export default deleteComment;
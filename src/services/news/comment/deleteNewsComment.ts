import { apiRequest } from "@/services/instant";

const deleteNewsComment = async (newsCommentId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await apiRequest.delete(
    `/api/news/comment/recommend/${newsCommentId}`,
    {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    }
  );
  return response;
};

export default deleteNewsComment;
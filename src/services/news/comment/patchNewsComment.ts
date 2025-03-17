import { apiRequest } from "@/services/instant";

const patchNewsComment = async (newsCommentId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await apiRequest.patch(
    `/api/news/comment/recommend/${newsCommentId}`,
    {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    }
  );
  return response;
};

export default patchNewsComment;
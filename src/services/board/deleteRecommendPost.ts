import { apiRequest } from "../instant";

interface deleteRecommendPost {
  boardId: string;
}

const deleteRecommendPost = async ({ boardId }: deleteRecommendPost) => {
  const response = await apiRequest.delete(
    `${process.env.NEXT_PUBLIC_API_URL}api/recommend/board/${boardId}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response;
};

export default deleteRecommendPost;

import { apiRequest } from "../instant";

interface PostRecommendData {
  boardId: string;
}

const postRecommend = async ({ boardId }: PostRecommendData) => {
  const response = await apiRequest.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/recommend/board/${boardId}`,
    {},
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response;
};

export default postRecommend;

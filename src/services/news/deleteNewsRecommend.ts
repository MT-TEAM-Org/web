import { apiRequest } from "../instant";

const deleteNewsRecommend = async (newsId: string) => {
    const response = await apiRequest.delete(
      `${process.env.NEXT_PUBLIC_API_URL}api/news/count/recommend/${newsId}`,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    return response;
};

export default deleteNewsRecommend;
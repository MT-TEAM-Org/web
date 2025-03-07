import { apiRequest } from "../instant";

const deleteNewsRecommend = async (newsId: string) => {
  const response = await apiRequest.delete(
    `api/news/count/recommend/${newsId}`
  );
  return response;
};

export default deleteNewsRecommend;
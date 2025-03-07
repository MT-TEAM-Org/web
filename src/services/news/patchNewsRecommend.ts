import { apiRequest } from "../instant";

const patchNewsRecommend = async (newsId: string) => {
  const response = await apiRequest.patch(
    `api/news/count/recommend/${newsId}`
  );
  return response;
};

export default patchNewsRecommend;
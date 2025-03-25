import { apiRequest } from "@/services/instant";

const deleteFeedbackRecommend = async (improvementId: number) => {
  const response = await apiRequest.delete(
    `api/recommend/improvement/${improvementId}`
  );
  return response;
};

export default deleteFeedbackRecommend;
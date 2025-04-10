import { apiRequest } from "@/services/instant";

const deleteFeedbackRecommend = async (feedbackId: number) => {
  const response = await apiRequest.delete(
    `api/recommend/improvement/${feedbackId}`
  );
  return response;
};

export default deleteFeedbackRecommend;
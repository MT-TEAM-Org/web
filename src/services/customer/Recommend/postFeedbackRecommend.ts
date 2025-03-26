import { apiRequest } from "@/services/instant";

const postFeedbackRecommend = async (feedbackId: number) => {
  const response = await apiRequest.post(
    `api/recommend/improvement/${feedbackId}`
  );
  return response;
};

export default postFeedbackRecommend;
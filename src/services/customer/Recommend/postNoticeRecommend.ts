import { apiRequest } from "@/services/instant";

const postNoticeRecommend = async (noticeId: number) => {
  const response = await apiRequest.post(
    `api/recommend/notice/${noticeId}`
  );
  return response;
};

export default postNoticeRecommend;
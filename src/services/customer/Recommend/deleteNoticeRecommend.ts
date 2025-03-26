import { apiRequest } from "@/services/instant";

const deleteNoticeRecommend = async (noticeId: number) => {
  const response = await apiRequest.delete(
    `api/recommend/notice/${noticeId}`
  );
  return response;
};

export default deleteNoticeRecommend;
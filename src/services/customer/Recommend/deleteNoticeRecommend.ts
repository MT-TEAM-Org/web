import { apiRequest } from "@/services/instant";

const deleteNoticeRecommend = async (noticeId: string | string[]) => {
  const response = await apiRequest.delete(
    `api/recommend/notice/${noticeId}`
  );
  return response;
};

export default deleteNoticeRecommend;
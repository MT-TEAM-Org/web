import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";
import { useQuery } from "@tanstack/react-query";

interface useGetFeedbackInfoDataProps {
  id: number;
}

const useGetFeedbackInfoData = ({id}: useGetFeedbackInfoDataProps) => {
  return useQuery({
    queryKey: ["noticeInfo", id],
    queryFn: () => getFeedbackInfoData({id}),
    retry: 1,
  });
};

export default useGetFeedbackInfoData;
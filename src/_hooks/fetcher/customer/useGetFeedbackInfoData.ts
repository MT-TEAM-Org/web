import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";
import { useQuery } from "@tanstack/react-query";

const useGetFeedbackInfoData = ({id}) => {
  return useQuery({
    queryKey: ["noticeInfo", id],
    queryFn: () => getFeedbackInfoData({id}),
    retry: 1,
  });
};

export default useGetFeedbackInfoData;
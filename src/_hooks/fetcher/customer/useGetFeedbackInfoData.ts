import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";
import { useQuery } from "@tanstack/react-query";

interface useGetFeedbackInfoDataProps {
  id: number;
  token: string;
}

const useGetFeedbackInfoData = ({id, token}: useGetFeedbackInfoDataProps) => {
  return useQuery({
    queryKey: ["feedbackInfo", id],
    queryFn: () => getFeedbackInfoData({id, token}),
    retry: 1,
  });
};

export default useGetFeedbackInfoData;
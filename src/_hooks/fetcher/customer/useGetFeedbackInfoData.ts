import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";
import { useQuery } from "@tanstack/react-query";

interface useGetFeedbackInfoDataProps {
  id: string | string[];
}

const useGetFeedbackInfoData = ({id}: useGetFeedbackInfoDataProps) => {
  return useQuery({
    queryKey: ["feedbackInfo", id],
    queryFn: () => getFeedbackInfoData({id}),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetFeedbackInfoData;
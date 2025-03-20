import { feedbackListConfig } from "@/app/(route)/customer/_types/feedbackListConfig";
import getFeedbackDataList from "@/services/customer/getFeedbackDataList";
import { useQuery } from "@tanstack/react-query";

const useGetFeedbackDataList = (data: feedbackListConfig) => {
  return useQuery({
    queryKey: ["feedbackDataList", data],
    queryFn: () => getFeedbackDataList(data),
    retry: 1,
  });
};

export default useGetFeedbackDataList;
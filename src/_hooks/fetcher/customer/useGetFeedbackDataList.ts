import { feedbackListConfig } from "@/app/(route)/customer/_types/feedbackListConfig";
import getFeedbackDataList from "@/services/customer/getFeedbackDataList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetFeedbackDataList = (data: feedbackListConfig) => {
  return useQuery({
    queryKey: ["feedbackDataList", data],
    queryFn: () => getFeedbackDataList(data),
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
};

export default useGetFeedbackDataList;
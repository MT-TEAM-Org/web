import getFeedbackDataList from "@/services/customer/getFeedbackDataList";
import { useQuery } from "@tanstack/react-query";

interface useGetFeedbackDataListProps {
  pageNum: number;
  order: string;
  searchType?: string;
  search?: string;
}

const useGetFeedbackDataList = ({pageNum, order, searchType, search}: useGetFeedbackDataListProps) => {
  return useQuery({
    queryKey: ["feedbackList", pageNum, order, searchType, search],
    queryFn: () => getFeedbackDataList({pageNum, order, searchType, search}),
    retry: 1,
  });
};

export default useGetFeedbackDataList;
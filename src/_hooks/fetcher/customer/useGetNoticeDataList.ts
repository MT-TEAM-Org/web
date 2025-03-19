import getNoticeDataList from "@/services/customer/getNoticeDataList";
import { useQuery } from "@tanstack/react-query";

const useGetNoticeDataList = (pageNum: number, searchType?: string, search?: string) => {
  return useQuery({
    queryKey: ["noticeList", pageNum, searchType, search],
    queryFn: () => getNoticeDataList(pageNum, searchType, search),
    retry: 1,
  });
};

export default useGetNoticeDataList;
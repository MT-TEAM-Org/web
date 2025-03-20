import { noticeListConfig } from "@/app/(route)/customer/_types/noticeListConfig";
import getNoticeDataList from "@/services/customer/getNoticeDataList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetNoticeDataList = (data: noticeListConfig) => {
  return useQuery({
    queryKey: ["noticeList", data],
    queryFn: () => getNoticeDataList(data),
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
};

export default useGetNoticeDataList;
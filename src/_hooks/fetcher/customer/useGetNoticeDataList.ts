import { noticeListConfig } from "@/app/(route)/customer/_types/customer";
import getNoticeDataList from "@/services/customer/getNoticeDataList";
import { useQuery } from "@tanstack/react-query";

const useGetNoticeDataList = (data: noticeListConfig) => {
  return useQuery({
    queryKey: ["noticeList", data],
    queryFn: () => getNoticeDataList(data),
    retry: 1,
  });
};

export default useGetNoticeDataList;
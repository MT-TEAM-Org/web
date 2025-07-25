import getNoticeInfoData from "@/services/customer/getNoticeInfoData";
import { useQuery } from "@tanstack/react-query";

const useGetNoticeInfoData = ({id}) => {
  return useQuery({
    queryKey: ["noticeInfo", id],
    queryFn: () => getNoticeInfoData({id}),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetNoticeInfoData;
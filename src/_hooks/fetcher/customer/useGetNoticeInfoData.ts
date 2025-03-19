import getNoticeInfoData from "@/services/customer/getNoticeInfoData";
import { useQuery } from "@tanstack/react-query";

const useGetNoticeInfoData = ({id}) => {
  return useQuery({
    queryKey: ["noticeInfo", id],
    queryFn: () => getNoticeInfoData({id}),
    retry: 1,
  });
};

export default useGetNoticeInfoData;
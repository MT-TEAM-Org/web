import getNoticeInfoData from "@/services/customer/getNoticeInfoData";
import { useQuery } from "@tanstack/react-query";

const useGetNoticeInfoData = ({id, token}) => {
  return useQuery({
    queryKey: ["noticeInfo", id],
    queryFn: () => getNoticeInfoData({id, token}),
    retry: 1,
  });
};

export default useGetNoticeInfoData;
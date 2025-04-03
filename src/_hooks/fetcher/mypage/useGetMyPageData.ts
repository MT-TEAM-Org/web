import getMyPageData from "@/services/mypage/getMypageData";
import { useQuery } from "@tanstack/react-query";

const useGetMyPageData = () => {
  return useQuery({
    queryKey: ["mypage"],
    queryFn: getMyPageData,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetMyPageData;

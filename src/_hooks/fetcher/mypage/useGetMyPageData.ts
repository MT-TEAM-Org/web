import getMyPageData from "@/services/mypage/getMypageData";
import { useQuery } from "@tanstack/react-query";

const useGetMyPageData = () => {
  return useQuery({
    queryKey: ["mypage"],
    queryFn: getMyPageData,
    retry: false,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetMyPageData;

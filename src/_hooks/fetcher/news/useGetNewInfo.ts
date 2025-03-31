import getNewsItemInfo from "@/services/news/GetNewsItemInfo";
import { useQuery } from "@tanstack/react-query";

const useGetNewsInfoData = (id: string, token: string) => {
  return useQuery({
    queryKey: ["getNewsInfo", id],
    queryFn: () => getNewsItemInfo({ id, token }),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetNewsInfoData;
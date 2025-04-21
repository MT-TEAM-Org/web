import getGameEvent from "@/services/main/mainRightBar/getGameEvent";
import { useQuery } from "@tanstack/react-query";

interface useGetGameEventProps {
  pageNum: number;
  size: number;
}

const useGetGameEvent = ({ pageNum, size = 5 }: useGetGameEventProps) => {
  return useQuery({
    queryKey: ["gameEvent", pageNum, size],
    queryFn: () => getGameEvent({ pageNum, size }),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetGameEvent;

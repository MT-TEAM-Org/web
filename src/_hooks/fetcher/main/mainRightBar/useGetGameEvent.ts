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
  });
};

export default useGetGameEvent;

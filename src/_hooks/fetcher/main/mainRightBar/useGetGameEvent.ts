import getGameEvent from "@/services/main/mainRightBar/getGameEvent";
import { useQuery } from "@tanstack/react-query";

const useGetGameEvent = ({ pageNum }: { pageNum: number }) => {
  return useQuery({
    queryKey: ["gameEvent", pageNum],
    queryFn: () => getGameEvent({ pageNum }),
  });
};

export default useGetGameEvent;

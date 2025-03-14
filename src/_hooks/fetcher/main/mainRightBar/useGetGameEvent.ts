import getGameEvent from "@/services/main/mainRightBar/getGameEvent";
import { useQuery } from "@tanstack/react-query";

const useGetGameEvent = () => {
  return useQuery({
    queryKey: ["gameEvent"],
    queryFn: getGameEvent,
  });
};

export default useGetGameEvent;

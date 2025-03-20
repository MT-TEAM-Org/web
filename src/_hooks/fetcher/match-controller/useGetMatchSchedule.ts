import getMatchSchedule, {
  MatchScheduleResponse,
} from "@/services/match-controller/getMatchSchedule";
import { useQuery } from "@tanstack/react-query";

const useGetMatchSchedule = (category?: string) => {
  return useQuery<MatchScheduleResponse>({
    queryFn: () => getMatchSchedule(category),
    queryKey: ["matchSchedule", category],
    retry: 1,
  });
};

export default useGetMatchSchedule;

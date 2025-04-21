import getMatchSchedule, {
  MatchScheduleResponse,
} from "@/services/match-controller/getMatchSchedule";
import { useQuery } from "@tanstack/react-query";

const useGetMatchSchedule = (category?: string) => {
  return useQuery<MatchScheduleResponse>({
    queryFn: () => getMatchSchedule(category),
    queryKey: ["matchSchedule", category],
    retry: 1,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export default useGetMatchSchedule;

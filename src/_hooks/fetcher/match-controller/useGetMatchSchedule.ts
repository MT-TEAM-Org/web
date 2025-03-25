import getMatchSchedule, {
  MatchScheduleResponse,
} from "@/services/match-controller/getMatchSchedule";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetMatchSchedule = (category?: string) => {
  const queryClient = useQueryClient();
  return useQuery<MatchScheduleResponse>({
    queryFn: () => getMatchSchedule(category),
    queryKey: ["matchSchedule", category],
    retry: 1,
  });
};

export default useGetMatchSchedule;

import getEsportsMatch from "@/services/match-controller/getEsportsMatch";
import { useQuery } from "@tanstack/react-query";

const useGetEsportsSchedule = () => {
  return useQuery({
    queryFn: getEsportsMatch,
    queryKey: ["EsportsSchedule"],
    retry: 1,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export default useGetEsportsSchedule;

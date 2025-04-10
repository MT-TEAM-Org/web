import getEsportsMatch from "@/services/match-controller/getEsportsMatch";
import { useQuery } from "@tanstack/react-query";

const useGetEsportsSchedule = () => {
  return useQuery({
    queryFn: getEsportsMatch,
    queryKey: ["EsportsSchedule"],
    retry: 1,
  });
};

export default useGetEsportsSchedule;

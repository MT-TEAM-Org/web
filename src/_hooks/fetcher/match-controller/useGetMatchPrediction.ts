import getMatchPrediction from "@/services/match-controller/getMatchPredition";
import { useQuery } from "@tanstack/react-query";

const useGetMatchPrediction = (matchId: number) => {
  return useQuery({
    queryFn: () => getMatchPrediction(matchId),
    queryKey: ["matchPrediction", matchId],
    retry: 1,
  });
};

export default useGetMatchPrediction;

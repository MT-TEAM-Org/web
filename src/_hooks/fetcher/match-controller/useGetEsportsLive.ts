import getEsportsLive from "@/services/match-controller/getEsportsLive";
import { useQuery } from "@tanstack/react-query";

const useGetEsportsLive = () => {
  return useQuery({
    queryFn: getEsportsLive,
    queryKey: ["esportsLive"],
    retry: 1,
  });
};

export default useGetEsportsLive;

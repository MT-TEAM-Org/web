import { newsListConfig } from "@/app/(route)/news/_types/newsListConfig";
import getSortedNewsDataList from "@/services/news/getSortedNewsDataList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useSortedNewsDataList = (data: newsListConfig) => {
  return useQuery({
    queryKey: ["newsDataList", data],
    queryFn: () => getSortedNewsDataList(data),
    placeholderData: keepPreviousData,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useSortedNewsDataList;
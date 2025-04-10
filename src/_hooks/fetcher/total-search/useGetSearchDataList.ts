import { searchListConfig } from "@/app/(route)/total-search/_types/searchListConfig";
import getSearchDataList from "@/services/total-search/getSearchDataList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetSearchDataList = (data: searchListConfig) => {
  return useQuery({
    queryKey: ["searchDataList", data],
    queryFn: () => getSearchDataList(data),
    placeholderData: keepPreviousData,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetSearchDataList;
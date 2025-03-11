import { NewsDataParams } from "@/app/_constants/newsDataParams";
import fetchSortedNewsDataList from "@/services/news/fetchSortedNewsDataList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface ExtendedNavigator extends Navigator {
  connection?: {
    effectiveType?: string;
  };
}

const useSortedNewsDataList = (params: NewsDataParams) => {
  const {
    category,
    orderType = "DATE",
    page = 1,
    timePeriod = "DAILY",
    searchType = "",
  } = params;

  const queryClient = useQueryClient();
  const currentPage = page;

  const query = useQuery({
    queryKey: ["newsDataList", category, orderType, timePeriod, currentPage, searchType],
    queryFn: () => fetchSortedNewsDataList({ category, orderType, page: currentPage, timePeriod, searchType }),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const nextPage = currentPage + 1;
      const effectiveType = (navigator as ExtendedNavigator).connection?.effectiveType;
      const isSlowNetwork = effectiveType === "2g" || effectiveType === "3g";
      if (nextPage === 6 || isSlowNetwork) return;

      const nextPageQueryKey = ["newsDataList", category, orderType, timePeriod, nextPage];
      const nextPageData = queryClient.getQueryData(nextPageQueryKey);

      if (!nextPageData) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => fetchSortedNewsDataList({ category, orderType, page: nextPage, timePeriod }),
          retry: 1,
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 60,
        });
      }
    }
  }, [query.isSuccess, currentPage, category, orderType, timePeriod, searchType]);

  return query;
};

export default useSortedNewsDataList;
import fetchSortedNewsDataList from "@/services/news/fetchSortedNewsDataList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface NewsDataParams {
  category?: "BASEBALL" | "FOOTBALL" | "ESPORTS";
  orderType: "DATE" | "COMMENT" | "VIEW";
  pageNum: number;
  timeType: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  searchType: string;
}

interface ExtendedNavigator extends Navigator {
  connection?: {
    effectiveType?: string;
  };
}

const useSortedNewsDataList = ({
  category,
  orderType = "DATE",
  pageNum = 1,
  timeType = "DAILY",
  searchType = "",
}: NewsDataParams) => {
  const queryClient = useQueryClient();
  const currentPage = pageNum;

  const query = useQuery({
    queryKey: ["newsDataList", category, orderType, timeType, currentPage, searchType],
    queryFn: () => fetchSortedNewsDataList({ category, orderType, pageNum: currentPage, timeType, searchType }),
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

      const nextPageQueryKey = ["newsDataList", category, orderType, timeType, nextPage];
      const nextPageData = queryClient.getQueryData(nextPageQueryKey);

      if (!nextPageData) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => fetchSortedNewsDataList({ category, orderType, pageNum: nextPage, timeType }),
          retry: 1,
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 60,
        });
      }
    }
  }, [query.isSuccess, currentPage, category, orderType, timeType, searchType]);

  return query;
};

export default useSortedNewsDataList;
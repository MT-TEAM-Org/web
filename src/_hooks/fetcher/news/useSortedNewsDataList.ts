import fetchSortedNewsDataList from "@/services/news/fetchSortedNewsDataList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface NewsDataParams {
  category?: string;
  orderType?: "DATE" | "COMMENT" | "VIEW";
  pageNum?: number;
  timeType?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  searchType?: string;
}

interface ExtendedNavigator extends Navigator {
  connection?: {
    effectiveType?: string;
  };
}

const useSortedNewsDataList = ({
  category,
  orderType,
  pageNum,
  timeType,
  searchType,
}: NewsDataParams) => {
  const queryClient = useQueryClient();
  const currentPage = pageNum || 1;

  const query = useQuery({
    queryKey: ["newsDataList", category || "BASEBALL", orderType || "DATE", timeType || "DAILY", currentPage || "", searchType],
    queryFn: () =>
      fetchSortedNewsDataList({ category, orderType, pageNum: currentPage, timeType, searchType }),
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

      const nextPageQueryKey = [
        "newsDataList",
        category || "BASEBALL",
        orderType || "DATE",
        timeType || "DAILY",
        nextPage,
      ];
      const nextPageData = queryClient.getQueryData(nextPageQueryKey);

      if (!nextPageData) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () =>
            fetchSortedNewsDataList({
              category: category || "BASEBALL",
              orderType: orderType || "DATE",
              pageNum: nextPage,
              timeType: timeType || "DAILY",
            }),
          retry: 1,
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 60,
        });
      }
    }
  }, [query.isSuccess, currentPage, category, orderType, timeType, searchType, queryClient]);

  return query;
};

export default useSortedNewsDataList;
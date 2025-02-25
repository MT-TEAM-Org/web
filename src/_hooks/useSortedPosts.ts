"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

interface NewsDataParams {
  category?: string;
  orderType?: "DATE" | "COMMENT" | "VIEW";
  pageNum?: number;
}

interface ExtendedNavigator extends Navigator {
  connection?: {
    effectiveType?: string;
  };
}

const fetchSortedNewsDataList = async ({ category, orderType, pageNum }: NewsDataParams) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params: {
      category: category || "BASEBALL",
      orderType: orderType || "DATE",
      page: pageNum || 1,
      size: 10,
    },
  });
  return response.data.data.list.content;
};

// 뉴스 정렬 API
const useSortedNewsDataList = ({ category, orderType, pageNum }: NewsDataParams) => {
  const queryClient = useQueryClient();
  const currentPage = pageNum || 1;

  const query = useQuery({
    queryKey: ["newsDataList", category || "BASEBALL", orderType || "DATE", currentPage],
    queryFn: () => fetchSortedNewsDataList({ category, orderType, pageNum: currentPage }),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  // 현재 페이지 데이터 로드가 완료되면 다음 페이지 프리패칭
  useEffect(() => {
    if (query.isSuccess) {
      const nextPage = currentPage + 1;
      const effectiveType = (navigator as ExtendedNavigator).connection?.effectiveType;
      const isSlowNetwork = effectiveType === "2g" || effectiveType === "3g"; // 네트워크가 2g 혹은 3g 상황이면 isSlowNetwork
      if (nextPage === 6) return;
      if (isSlowNetwork) return;
      
      // 다음 페이지 데이터가 이미 캐시에 있는지 확인
      const nextPageQueryKey = ["newsDataList", category || "BASEBALL", orderType || "DATE", nextPage];
      const nextPageData = queryClient.getQueryData(nextPageQueryKey);
      
      // 캐시에 데이터가 없을 경우에만 프리패칭 실행
      if (!nextPageData) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => fetchSortedNewsDataList({
            category: category || "BASEBALL",
            orderType: orderType || "DATE",
            pageNum: nextPage,
          }),
          retry: 1,
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 60,
        });
      }
    }
  }, [query.isSuccess, currentPage, category, orderType, queryClient]);

  return query;
};

export default useSortedNewsDataList;
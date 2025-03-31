// hooks/useGetNewsDataList.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

export interface NewsQueryParams {
  page?: string;
  size?: number;
  timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  category?: "" | "FOOTBALL" | "BASEBALL" | "ESPORTS";
  orderType?: "DATE" | "COMMENT" | "VIEW";
  content?: string;
  withPageInfo?: boolean;
}

export interface NewsListWithPageInfo {
  content: NewsItemType[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElements: number;
  };
}

type NewsDataReturnType = NewsListWithPageInfo | NewsItemType[];

const useGetNewsDataList = (
  params: NewsQueryParams = {}
): UseQueryResult<NewsDataReturnType> => {
  return useQuery<NewsDataReturnType>({
    queryKey: ["newsDataList", params],
    queryFn: () => fetchNewsDataList(params),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export default useGetNewsDataList;

import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/_constants/newsItemType";

interface NewsDataProps {
  page?: string;
  size?: number;
  timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  category?: string;
  orderType?: "DATE" | "COMMENT" | "VIEW";
  content?: string;
  withPageInfo?: boolean;
}

interface NewsListWithPageInfo {
  content: NewsItemType[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElements: number;
  };
}

type NewsDataReturnType = NewsListWithPageInfo | NewsItemType[];

const useGetNewsDataList = (
  params: NewsDataProps = {}
): UseQueryResult<NewsDataReturnType> => {
  return useQuery({
    queryKey: ["newsDataList", params],
    queryFn: () => fetchNewsDataList(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,

    retry: 1,
  });
};

export default useGetNewsDataList;

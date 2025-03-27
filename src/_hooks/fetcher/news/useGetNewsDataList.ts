// import {
//   keepPreviousData,
//   useQuery,
//   UseQueryResult,
// } from "@tanstack/react-query";
// import fetchNewsDataList from "@/services/news/fetchNewsDataList";
// import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

// interface NewsDataProps {
//   page?: string;
//   size?: number;
//   timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
//   category?: "" | "FOOTBALL" | "BASEBALL" | "ESPORTS";
//   orderType?: "DATE" | "COMMENT" | "VIEW";
//   content?: string;
//   withPageInfo?: boolean;
// }

// interface NewsListWithPageInfo {
//   content: NewsItemType[];
//   pageInfo: {
//     currentPage: number;
//     totalPage: number;
//     totalElements: number;
//   };
// }

// type NewsDataReturnType = NewsListWithPageInfo | NewsItemType[];

// const useGetNewsDataList = (
//   params: NewsDataProps = {}
// ): UseQueryResult<NewsDataReturnType> => {
//   return useQuery({
//     queryKey: ["newsDataList", params],
//     queryFn: () => fetchNewsDataList(params),
//     placeholderData: keepPreviousData,
//     staleTime: 30 * 60 * 1000,
//     gcTime: 60 * 60 * 1000,

//     retry: 1,
//   });
// };

// export default useGetNewsDataList;
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

interface NewsDataProps {
  page?: string;
  size?: number;
  timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  category?: "" | "FOOTBALL" | "BASEBALL" | "ESPORTS";
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
    queryKey: [
      "newsDataList",
      params.page,
      params.category,
      params.orderType,
      params.timePeriod,
      params.withPageInfo,
      params.content,
    ],
    queryFn: () => fetchNewsDataList(params),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
};

export default useGetNewsDataList;

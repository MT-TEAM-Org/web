import { keepPreviousData, useQuery } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

interface NewsDataProps {
  page?: string;
  isMainPage?: boolean;
  startIndex?: number;
  size?: number
}

interface NewsListWithPageInfo {
  content: NewsItemType[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElements: number;
    startIndex?: number;
  };
}

const useGetMainRightBarNewsData = ({
  page = "1",
  isMainPage = false,
  startIndex = 3,
  size = 5,
}: NewsDataProps = {}) => {
  const currentPage = Number(page);

  return useQuery<NewsListWithPageInfo>({
    queryKey: ["mainRightBarNewsDataList", currentPage, isMainPage, size],
    queryFn: () =>
      fetchNewsDataList({
        page: String(currentPage),
        size,
        withPageInfo: true,
        timePeriod: "WEEKLY",
        startIndex,
      }),
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export default useGetMainRightBarNewsData;

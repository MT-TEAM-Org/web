import { keepPreviousData, useQuery } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

interface NewsDataProps {
  page?: string;
  isMainPage?: boolean;
}

interface NewsListWithPageInfo {
  content: NewsItemType[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElements: number;
  };
}

const useGetMainRightBarNewsData = ({
  page = "1",
  isMainPage = false,
}: NewsDataProps = {}) => {
  const currentPage = Number(page);

  return useQuery<NewsListWithPageInfo>({
    queryKey: ["mainRightBarNewsDataList", currentPage, isMainPage],
    queryFn: () =>
      fetchNewsDataList({
        page: String(currentPage),
        size: 5,
        withPageInfo: true,
        timePeriod: "WEEKLY",
      }),
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export default useGetMainRightBarNewsData;

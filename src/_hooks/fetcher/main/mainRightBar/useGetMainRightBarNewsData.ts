import { keepPreviousData, useQuery } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsListWithPageInfo } from "@/app/(route)/main/_types/NewsDataProps";

interface NewsDataProps {
  page?: string;
  isMainPage?: boolean;
  startIndex?: number;
  size?: number;
  timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
}

const useGetMainRightBarNewsData = ({
  page = "1",
  isMainPage = false,
  startIndex = 4,
  size = 5,
  timePeriod = "MONTHLY",
}: NewsDataProps = {}) => {
  const currentPage = Number(page);

  return useQuery<NewsListWithPageInfo>({
    queryKey: ["mainRightBarNewsDataList", currentPage, isMainPage, size],
    queryFn: () =>
      fetchNewsDataList({
        page: String(currentPage),
        size,
        withPageInfo: true,
        timePeriod,
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

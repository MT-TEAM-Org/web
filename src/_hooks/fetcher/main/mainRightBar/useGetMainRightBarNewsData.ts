import { useQuery } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/_constants/newsItemType";

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
    retry: 1,
  });
};

export default useGetMainRightBarNewsData;

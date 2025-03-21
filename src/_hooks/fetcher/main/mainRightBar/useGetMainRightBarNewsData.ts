import { useQuery } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/_constants/newsItemType";

interface NewsListWithPageInfo {
  content: NewsItemType[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElements: number;
  };
}

const useGetMainRightBarNewsData = ({ page }: NewsDataProps = {}) => {
  return useQuery<NewsListWithPageInfo>({
    queryKey: ["mainRightBarNewsDataList", page],
    queryFn: () =>
      fetchNewsDataList({
        page,
        startIndex: Number(page) === 1 ? 4 : (Number(page) - 1) * 5 + 4,
        size: 5,
        withPageInfo: true,
      }),
    retry: 1,
  });
};

export default useGetMainRightBarNewsData;

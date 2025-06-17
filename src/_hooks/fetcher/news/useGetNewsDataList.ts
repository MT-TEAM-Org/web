import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import { NewsDataProps } from "@/app/(route)/main/_types/NewsDataProps";
import { NewsListWithPageInfo } from "@/app/(route)/main/_types/NewsDataProps";

type NewsDataReturnType = NewsListWithPageInfo | NewsItemType[];

const useGetNewsDataList = (
  params: NewsDataProps = {}
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

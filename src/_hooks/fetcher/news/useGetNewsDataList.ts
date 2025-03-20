import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { useQuery } from "@tanstack/react-query";

interface NewsDataProps {
  page?: string;
}

const useGetNewsDataList = ({ page }: NewsDataProps = {}) => {
  return useQuery({
    queryKey: ["newsDataList", page || 1],
    queryFn: () =>
      fetchNewsDataList({
        page,
        startIndex: (Number(page) - 1) * 5, // ✅ 페이지별로 다른 뉴스 가져오기
      }),
    retry: 1,
  });
};

export default useGetNewsDataList;

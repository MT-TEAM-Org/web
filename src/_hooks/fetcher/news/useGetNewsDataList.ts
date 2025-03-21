import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { useQuery } from "@tanstack/react-query";

interface NewsDataProps {
  page?: string;
}

const useGetNewsDataList = ({ page }: NewsDataProps = {}) => {
  const currentPage = Number(page || 1);

  return useQuery({
    queryKey: ["newsDataList", currentPage],
    queryFn: () =>
      fetchNewsDataList({
        page: String(currentPage),
        startIndex: (currentPage - 1) * 5,
      }),
    retry: 1,
  });
};

export default useGetNewsDataList;

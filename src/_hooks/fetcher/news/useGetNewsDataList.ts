import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { useQuery } from "@tanstack/react-query";

interface NewsDataProps {
  page?: string;
  startIndex?: number;
}

const useGetNewsDataList = ({ page, startIndex = 0 }: NewsDataProps = {}) => {
  return useQuery({
    queryKey: ["newsDataList", page || "1", startIndex],
    queryFn: () => fetchNewsDataList({ page, startIndex }),
    retry: 1,
  });
};

export default useGetNewsDataList;

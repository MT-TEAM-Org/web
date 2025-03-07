import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { useQuery } from "@tanstack/react-query";

interface NewsDataProps {
  category?: string;
  page?: string;
}

const useGetNewsDataList = ({ category, page }: NewsDataProps = {}) => {
  return useQuery({
    queryKey: ["newsDataList", category || "BASEBALL", page || 1],
    queryFn: () => fetchNewsDataList({ category, page }),
    retry: 1,
  });
};

export default useGetNewsDataList;
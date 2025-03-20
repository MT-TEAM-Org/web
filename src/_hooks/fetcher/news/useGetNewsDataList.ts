import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { useQuery } from "@tanstack/react-query";

interface NewsDataProps {
  page?: string;
}

const useGetNewsDataList = ({ page }: NewsDataProps = {}) => {
  return useQuery({
    queryKey: ["newsDataList", page || 1],
    queryFn: () => fetchNewsDataList({ page }),
    retry: 1,
  });
};

export default useGetNewsDataList;

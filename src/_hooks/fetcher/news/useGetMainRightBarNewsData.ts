import { useQuery } from "@tanstack/react-query";
import fetchNewsDataList from "@/services/news/fetchNewsDataList";

interface NewsDataProps {
  page?: string;
}

const useGetMainRightBarNewsData = ({ page }: NewsDataProps = {}) => {
  return useQuery({
    queryKey: ["mainRightBarNewsDataList", page],
    queryFn: () =>
      fetchNewsDataList({
        page,
        startIndex: Number(page) === 1 ? 4 : (Number(page) - 1) * 5 + 4,
      }),
    retry: 1,
  });
};

export default useGetMainRightBarNewsData;

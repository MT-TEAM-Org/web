import fetchNewsDataList from "@/services/news/fetchNewsDataList";
import { useQuery } from "@tanstack/react-query";

interface NewsDataProps {
  page?: string;
  startIndex?: number; // ✅ 4번째부터 가져올지 여부 결정
}

const useGetNewsDataList = ({ page, startIndex = 0 }: NewsDataProps = {}) => {
  return useQuery({
    queryKey: ["newsDataList", page || "1", startIndex], // ✅ startIndex 추가
    queryFn: () => fetchNewsDataList({ page, startIndex }), // ✅ startIndex 전달
    retry: 1,
  });
};

export default useGetNewsDataList;

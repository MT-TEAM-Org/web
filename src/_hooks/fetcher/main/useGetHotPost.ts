import getHotContent, {
  GetHotContentItem,
} from "@/services/main/getHotContent";
import { useQuery } from "@tanstack/react-query";

export interface ApiResponse {
  data: GetHotContentItem[];
}

const useGetHotPost = () => {
  return useQuery<ApiResponse>({
    queryFn: () => getHotContent(),
    queryKey: ["hotContent"],
    retry: 1,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export default useGetHotPost;

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
  });
};

export default useGetHotPost;

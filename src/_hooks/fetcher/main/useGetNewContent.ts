import getNewContent, {
  GetNewContentItem,
} from "@/services/main/getNewContent";
import { useQuery } from "@tanstack/react-query";

export type ApiResponse = {
  data: { data: GetNewContentItem[] };
};
const useGetNewContent = () => {
  return useQuery<ApiResponse>({
    queryFn: getNewContent,
    queryKey: ["newContent"],
    retry: 1,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};
export default useGetNewContent;

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
  });
};
export default useGetNewContent;

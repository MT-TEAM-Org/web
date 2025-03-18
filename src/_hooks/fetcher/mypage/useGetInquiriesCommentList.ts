import getInquiriesCommentList from "@/services/mypage/getInquiriesCommentList";
import { useQuery } from "@tanstack/react-query";

const useGetInquiriesCommentList = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["inquiriesCommentList", id],
    queryFn: () => getInquiriesCommentList(id),
    enabled,
  });
};

export default useGetInquiriesCommentList;

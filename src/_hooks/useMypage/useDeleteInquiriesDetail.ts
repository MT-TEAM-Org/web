import deleteInquiriesDetail from "@/services/mypage/deleteInquiriesDetail";
import { useMutation } from "@tanstack/react-query";

const useDeleteInquiriesDetail = () => {
  return useMutation({
    mutationFn: (id: string) => deleteInquiriesDetail(id),
  });
};

export default useDeleteInquiriesDetail;

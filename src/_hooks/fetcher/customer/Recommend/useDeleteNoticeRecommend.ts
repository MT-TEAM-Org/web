import { useToast } from "@/_hooks/useToast";
import deleteNoticeRecommend from "@/services/customer/Recommend/deleteNoticeRecommend";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useDeleteNoticeRecommend = () => {
  const { success, error: toastError } = useToast();

  return useMutation({
    mutationFn: (noticeId: number) => deleteNoticeRecommend(noticeId),
    retry: 1,
    onSuccess: () => {
      success("추천이 삭제되었습니다.", "");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toastError("추천 삭제 실패", errorMessage);
      } else {
        toastError("추천 삭제 실패", "추천 삭제 중 오류가 발생했습니다.");
      }
    },
  });
};

export default useDeleteNoticeRecommend;

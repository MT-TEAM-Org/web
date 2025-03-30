import { useToast } from "@/_hooks/useToast";
import deleteFeedbackRecommend from "@/services/customer/Recommend/deleteFeedbackRecommend";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useDeleteFeedbackRecommend = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (feedbackId: number) => deleteFeedbackRecommend(feedbackId),
    retry: 1,
    onSuccess: () => {
      toast.success("추천이 취소되었습니다.", "")
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("추천 삭제 실패", errorMessage);
      } else {
        toast.error("추천 삭제 실패", "추천 삭제 중 오류가 발생했습니다.");
      }
    },
  });
};

export default useDeleteFeedbackRecommend;
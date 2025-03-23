import { useToast } from "@/_hooks/useToast";
import postFeedback from "@/services/customer/postFeedback";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FeedbackData {
  title: string;
  content: string;
  imgUrl?: string;
}

const usePostFeedback = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (data: FeedbackData) => postFeedback(data),
    retry: 1,
    onSuccess: () => {
      toast.success("개선요청 게시글이 생성이 완료되었습니다.", "");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("개선요청 게시글 생성 실패", errorMessage);
      } else {
        toast.error("개선요청 게시글 생성 실패", "개선요청 게시글 생성 중 오류가 발생했습니다.");
      }
    },
  });
};

export default usePostFeedback;
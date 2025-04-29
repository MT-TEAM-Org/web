import { useToast } from "@/_hooks/useToast";
import postFeedbackStatus from "@/services/customer/postFeedbackStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface usePostFeedbackStatus {
  id: number;
  status: "PENDING" | "RECEIVED" | "COMPLETED";
}

const usePostFeedbackStatus = ({ id, status }: usePostFeedbackStatus) => {
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: usePostFeedbackStatus) =>
      postFeedbackStatus({ id, status }),
    retry: 1,
    onSuccess: () => {
      success("상태가 변경되었습니다.", "");
      queryClient.refetchQueries({
        queryKey: ["feedbackInfo", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["feedbackInfo", id],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toastError("개선요청 상태 수정 실패", errorMessage);
      } else {
        toastError(
          "개선요청 상태 수정 실패",
          "개선요청 상태 수정 중 오류가 발생했습니다."
        );
      }
    },
  });
};

export default usePostFeedbackStatus;

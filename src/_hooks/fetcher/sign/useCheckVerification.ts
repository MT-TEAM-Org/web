import checkVerification from "@/services/sign/checkVerification";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";

const useCheckVerification = () => {
  const { success, error } = useToast();
  return useMutation({
    mutationFn: (data: { email: string; code: string }) =>
      checkVerification(data),
    onSuccess: () => {
      success("인증이 완료되었습니다.", "");
    },
    onError: () => {
      error("인증코드가 일치하지 않습니다.", "");
    },
  });
};

export default useCheckVerification;

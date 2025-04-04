"use client";

import sendVerification from "@/services/sign/sendVerification";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";

const useSendVerification = () => {
  const { success, error } = useToast();
  return useMutation({
    mutationFn: (email: string) => sendVerification(email),
    onSuccess: () => {
      success("인증 메일이 발송되었습니다.", "이메일을 확인해주세요.");
    },
    onError: () => {
      error("인증 메일 발송에 실패했습니다.", "");
    },
  });
};

export default useSendVerification;

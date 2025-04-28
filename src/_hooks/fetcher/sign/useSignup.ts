"use client";

import signup from "@/services/sign/signup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/_hooks/useToast";

interface Signup {
  email: string;
  password?: string;
  tel: string;
  nickname: string;
}

const useSignup = () => {
  const router = useRouter();
  const { error: isError, success } = useToast();
  return useMutation({
    mutationFn: (data: Signup) => signup(data),
    onSuccess: () => {
      success("회원가입이 완료되었습니다.", "");
      router.push("/sign?sign=login");
    },
    onError: (error: any) => {
      isError(error?.response?.data?.message || "회원가입에 실패했습니다.", "");
    },
  });
};

export default useSignup;

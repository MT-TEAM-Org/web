"use client";

import snsAddInfo from "@/services/sign/snsAddInfo";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/utils/Store";
import { useToast } from "@/_hooks/useToast";

interface SnsAddInfoData {
  email: string;
  memberType: "LOCAL" | "KAKAO" | "NAVER" | "GOOGLE" | "DISCORD";
  tel: string;
  nickname: string;
}

const useSnsAddInfo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { error: isError, success } = useToast();
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: (data: SnsAddInfoData) => snsAddInfo(data),
    onSuccess: () => {
      success("회원가입이 완료되었습니다.", "");
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      login();
      router.replace("/");
    },
    onError: (error: any) => {
      isError(error?.response?.data?.message || "회원가입에 실패했습니다.", "");
    },
  });
};

export default useSnsAddInfo;

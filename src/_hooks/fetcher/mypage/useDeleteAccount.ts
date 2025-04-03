"use client";

import deleteAccount from "@/services/mypage/deleteAccount";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";
import { useRouter } from "next/navigation";

const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { success } = useToast();

  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      success("회원탈퇴가 완료되었습니다.", "이용해주셔서 감사합니다.");
      localStorage.removeItem("accessToken");
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      router.push("/");
    },
  });
};

export default useDeleteAccount;

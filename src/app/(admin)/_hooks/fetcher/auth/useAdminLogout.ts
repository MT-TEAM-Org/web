"use client";

import adminLogout from "@/app/(admin)/_service/auth/adminLogout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";

const useAdminLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { success } = useToast();

  return useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      success("로그아웃 되었습니다.", "");
      localStorage.removeItem("adminAccessToken");
      queryClient.refetchQueries({ queryKey: ["adminAuthCheck"] });
      router.replace("/admin-login");
    },
  });
};

export default useAdminLogout;

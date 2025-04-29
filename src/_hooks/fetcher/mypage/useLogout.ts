"use client";

import logout from "@/services/mypage/logout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { success } = useToast();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      success(
        "로그아웃 되었습니다.",
        "로그인해서 플레이하이브에서 재밌게 놀아봐요!"
      );
      localStorage.removeItem("accessToken");
      queryClient.refetchQueries({ queryKey: ["authCheck"] });
      queryClient.invalidateQueries({ queryKey: ["inquiriesList"] });
      queryClient.invalidateQueries({ queryKey: ["myPostList"] });
      queryClient.invalidateQueries({ queryKey: ["myCommentList"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
      queryClient.invalidateQueries({ queryKey: ["commentList"] });
      queryClient.invalidateQueries({ queryKey: ["bestComment"] });
      router.replace("/");
    },
  });
};

export default useLogout;

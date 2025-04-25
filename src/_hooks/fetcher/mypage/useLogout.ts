"use client";

import logout from "@/services/mypage/logout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
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

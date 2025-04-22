"use client";

import logout from "@/services/mypage/logout";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      queryClient.invalidateQueries({ queryKey: ["inquiriesList"] });
      queryClient.invalidateQueries({ queryKey: ["myPostList"] });
      queryClient.invalidateQueries({ queryKey: ["myCommentList"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
      router.push("/");
    },
  });
};

export default useLogout;

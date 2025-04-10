"use client";

import { useToast } from "@/_hooks/useToast";
import deletePost from "@/services/board/deletePost";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const useDeletePost = (boardId: string) => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: () => deletePost({ boardId }),
    onSuccess: () => {
      toast.success("게시글이 삭제되었습니다.", "");
      router.back();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("게시글 삭제 실패", errorMessage);
      }
    },
  });
};

export default useDeletePost;

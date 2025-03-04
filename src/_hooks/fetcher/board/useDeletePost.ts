"use client";

import deletePost from "@/services/board/deletePost";
import { useMutation } from "@tanstack/react-query";

const useDeletePost = (boardId: string) => {
  return useMutation({
    mutationFn: () => deletePost({ boardId }),
    onSuccess: () => {
      alert("게시글이 삭제되었습니다.");
    },
  });
};

export default useDeletePost;

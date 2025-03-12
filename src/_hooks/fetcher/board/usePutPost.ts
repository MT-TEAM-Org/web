"use client";

import putPost, { EditBoardData } from "@/services/board/putPost";
import { useMutation } from "@tanstack/react-query";

interface PutPostParams {
  data: EditBoardData;
  boardId: string;
}

const usePutPost = () => {
  return useMutation({
    mutationFn: ({ data, boardId }: PutPostParams) => putPost(data, boardId),
    onSuccess: () => {
      alert("게시글이 수정되었습니다.");
    },
    onError: (error) => {
      alert("게시글 수정 중 오류가 발생했습니다.");
      console.error(error);
    },
  });
};

export default usePutPost;

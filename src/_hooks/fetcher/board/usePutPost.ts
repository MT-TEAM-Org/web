"use client";

import { useToast } from "@/_hooks/useToast";
import putPost, { EditBoardData } from "@/services/board/putPost";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface PutPostParams {
  data: EditBoardData;
  boardId: string;
}

const usePutPost = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ data, boardId }: PutPostParams) => putPost(data, boardId),
    onSuccess: () => {
      toast.success("게시글 수정 완료", "게시글이 수정 되었습니다.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error("게시글 등록 실패", "제목을 입력해주세요!");
      }
    },
  });
};

export default usePutPost;

"use client";

import { useToast } from "@/_hooks/useToast";
import putPost, { EditBoardData } from "@/services/board/putPost";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface PutPostParams {
  data: EditBoardData;
  boardId: string;
}

interface ApiReponse {
  data: EditBoardData;
}

const usePutPost = () => {
  const { success, error: toastError } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, boardId }: PutPostParams) => putPost(data, boardId),
    onSuccess: (response: ApiReponse) => {
      success("게시글 수정이 완료되었습니다.", "");
      queryClient.invalidateQueries({
        queryKey: ["board", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myPostList"],
      });
      const boardType = response?.data?.boardType.toLowerCase();
      const categoryType = response?.data?.categoryType;
      const boardId = response?.data?.boardId;
      if (boardId) {
        router.push(`/board/${boardType}/${categoryType}/${boardId}`);
      } else {
        router.back();
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMesaage =
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
        toastError("게시글 등록 실패", errorMesaage);
      }
    },
  });
};

export default usePutPost;

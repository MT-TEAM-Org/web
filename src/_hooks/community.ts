"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CommunityData } from "@/app/_constants/categories";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const postCommunitycontent = async (data: CommunityData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/board`,
    data,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const usePostCommunityContent = () => {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommunityData) => postCommunitycontent(data),
    onSuccess: (response) => {
      success("게시글 작성을 완료했습니다.", "");
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
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toastError("게시글 등록 실패", errorMessage);
      } else {
        toastError("게시글 등록 실패", "게시글 등록 중 오류가 발생했습니다.");
      }
    },
  });
};

export default usePostCommunityContent;

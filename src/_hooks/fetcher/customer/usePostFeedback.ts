"use client";

import { useToast } from "@/_hooks/useToast";
import postFeedback from "@/services/customer/postFeedback";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface PostCustomerResponse {
  status: string;
  msg: string;
  data: {
    noticeId: number;
    publicId: string;
    nickname: string;
    clientIp: string;
    title: string;
    content: string;
    imgUrl: string;
    status: string;
    recommendCount: number;
    commentCount: number;
    viewCount: number;
    createdAt: string;
    modifiedAt: string;
    previousId: number | null;
    nextId: number | null;
    isRecommended: boolean;
  };
}

interface FeedbackData {
  title: string;
  content: string;
  imgUrl?: string;
  link?: string;
  thumbUrl?: string;
}

const usePostFeedback = () => {
  const { success, error: toastError } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FeedbackData) => postFeedback(data),
    retry: 1,
    onSuccess: (response: PostCustomerResponse) => {
      success("개선요청이 생성되었습니다.", "");
      router.push(
        `/customer/feedback/feedback-info/${response?.data?.noticeId}`
      );
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toastError("개선요청 게시글 생성 실패", errorMessage);
      } else {
        toastError(
          "개선요청 게시글 생성 실패",
          "개선요청 게시글 생성 중 오류가 발생했습니다."
        );
      }
    },
  });
};

export default usePostFeedback;

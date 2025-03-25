import { useToast } from "@/_hooks/useToast";
import postNoticeRecommend from "@/services/customer/Recommend/postNoticeRecommend";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const usePostNoticeRecommend = () => {
  const toast = useToast();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  

  const mutation = useMutation({
    mutationFn: (noticeId: number) => postNoticeRecommend(noticeId),
    retry: 1,
    onSuccess: () => {
      toast.success("추천이 완료되었습니다.", "")
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setIsSignInModalOpen(true);
        return;
      }

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("공지사항 추천 실패", errorMessage);
      } else {
        toast.error("공지사항 추천 실패", "공지사항 추천 중 오류가 발생했습니다.");
      }
    },
  });

  return { ...mutation, isSignInModalOpen, setIsSignInModalOpen };
};

export default usePostNoticeRecommend;
import { useToast } from "@/_hooks/useToast";
import postNotice from "@/services/customer/postNotice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PostCustomerResponse } from "./usePostFeedback";

interface NoticeData {
  title: string;
  content: string;
  imgUrl?: string;
  link?: string;
  thumbUrl?: string;
}

const usePostNotice = () => {
  const { success, error: toastError } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoticeData) => postNotice(data),
    retry: 1,
    onSuccess: (response: PostCustomerResponse) => {
      success("공지사항이 생성되었습니다.", "");
      queryClient.invalidateQueries({ queryKey: ['noticeList'] });
      router.push(`/customer/notice/notice-info/${response?.data?.noticeId}`);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toastError("공지사항 생성 실패", errorMessage);
      } else {
        toastError(
          "공지사항 생성 실패",
          "공지사항 생성 중 오류가 발생했습니다."
        );
      }
    },
  });
};

export default usePostNotice;

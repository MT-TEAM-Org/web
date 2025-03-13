import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CommunityData } from "@/app/_constants/categories";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

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
  const toast = useToast();
  return useMutation({
    mutationFn: (data: CommunityData) => postCommunitycontent(data),
    onSuccess: (response, variables) => {
      toast.success("게시글 등록 성공", " 게시글 등록이 완료되었습니다.");
      const boardType = response?.data?.boardType.toLowerCase();
      const categoryType = response?.data?.categoryType;
      const boardId = response?.data?.boardId;
      if (boardId) {
        router.push(`/${boardType}/${categoryType}/${boardId}`);
      } else {
        router.back();
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "알 수 없는 오류가 발생했습니다.";
        toast.error("게시글 등록 실패", errorMessage);
      } else {
        toast.error("게시글 등록 실패", "게시글 등록 중 오류가 발생했습니다.");
      }
    },
  });
};

export default usePostCommunityContent;

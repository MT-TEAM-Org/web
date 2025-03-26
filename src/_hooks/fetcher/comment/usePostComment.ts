"use client";

import postInquirieComment from "@/services/comment/postComment";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";

interface PostInquirieComment {
  type: "BOARD" | "IMPROVEMENT" | "INQUIRY" | "NEWS" | "NOTICE";
  comment: string;
  imageUrl: string;
  mentionedPublicId: string;
  parentId: number;
}

const usePostComment = (id: string) => {
  const { success } = useToast();

  return useMutation({
    mutationFn: (data: PostInquirieComment) =>
      postInquirieComment({ id, ...data }),
    onSuccess: () => {
      success("댓글 입력이 완료되었습니다.", "");
    },
  });
};

export default usePostComment;

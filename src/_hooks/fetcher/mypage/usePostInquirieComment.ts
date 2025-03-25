import postInquirieComment from "@/services/mypage/postInquirieComment";
import { useMutation } from "@tanstack/react-query";

interface PostInquirieCommentProps {
  comment: string;
  imageUrl: string;
  mentionedPublicId: string;
}

const usePostInquirieComment = (id: string) => {
  return useMutation({
    mutationFn: (data: PostInquirieCommentProps) =>
      postInquirieComment({ id, ...data }),
  });
};

export default usePostInquirieComment;

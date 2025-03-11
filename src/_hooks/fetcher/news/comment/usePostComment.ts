import postNewsComment from "@/services/news/comment/postNewsComment";
import { useMutation } from "@tanstack/react-query";

const usePostComment = () => {
  return useMutation({
    mutationFn: ({ newsId, comment, imgUrl }: { newsId: number; comment: string; imgUrl: string }) =>
      postNewsComment({ newsId, comment, imgUrl }),

    retry: 1,
    onSuccess: () => {
      console.log("댓글 추가 성공");
    },
    onError: (error: any) => {
      console.error("댓글 추가 실패:", error);
    },
  });
};

export default usePostComment;
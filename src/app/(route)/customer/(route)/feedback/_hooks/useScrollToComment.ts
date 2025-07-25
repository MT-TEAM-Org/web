// 댓글 이동 커스텀 훅
import { useEffect } from "react";

export function useScrollToComment(searchParams: URLSearchParams) {
  useEffect(() => {
    const commentId = searchParams.get("commentId");
    if (!commentId) return;

    const element = document.getElementById(commentId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [searchParams]);
}
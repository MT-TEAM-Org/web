import { SearchListType } from "../_types/searchType";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useTotalSearchClick = (data: SearchListType) => {
  const router = useRouter();

  return useCallback(() => {
    if (data?.boardType === "NEWS") {
      router.push(`/news/${data?.id}`);
    } else {
      if (data?.boardCommentSearchList?.commentId) {
        router.push(
          `/board/${data?.boardType}/${data?.categoryType}/${data?.id}?commentId=${data?.boardCommentSearchList?.commentId}`
        );
      } else {
        router.push(
          `/board/${data?.boardType}/${data?.categoryType}/${data?.id}`
        );
      }
    }
  }, [data, router]);
};
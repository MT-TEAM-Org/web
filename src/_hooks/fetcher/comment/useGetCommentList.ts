import getCommentList from "@/services/comment/getCommentList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentType } from "@/_types/comment";

const useGetCommentList = (id: string, type: CommentType) => {
  return useInfiniteQuery({
    queryKey: ["commentList", type, id],
    queryFn: ({ pageParam = 1 }) =>
      getCommentList({ id, type, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage.data.content;
      return pageInfo.currentPage < pageInfo.totalPage
        ? pageInfo.currentPage + 1
        : undefined;
    },
    enabled: !!id,
  });
};

export default useGetCommentList;

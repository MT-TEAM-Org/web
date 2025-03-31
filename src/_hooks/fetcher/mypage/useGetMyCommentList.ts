import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getMyCommentList from "@/services/mypage/getMyCommentList";
import { PostListConfig } from "@/app/(route)/mypage/posts/_types/postTypes";

const useGetMyCommentList = (postListConfig: PostListConfig) => {
  return useQuery({
    queryFn: () => getMyCommentList(postListConfig),
    queryKey: ["myPostList", postListConfig],
    retry: 1,
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

export default useGetMyCommentList;

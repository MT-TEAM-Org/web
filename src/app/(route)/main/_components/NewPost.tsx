import React from "react";
import NewPostItem from "./NewPostItem";
import useGetNewContent, {
  ApiResponse,
} from "@/_hooks/fetcher/main/useGetNewContent";
import MainPostItemSkeleton from "./MainPostItemSkeleton";
import MyPagePostEmpty from "../../mypage/posts/_components/MypagePostEmpty";

const NewPost = () => {
  const { data: response, isLoading, isError } = useGetNewContent();
  const newPosts = response?.data?.data;

  return (
    <div className="w-full min-h-[392px] flex flex-col gap-2">
      <h3 className="font-[700] text-[16px] leading-6 tracking-[-0.02em] align-center">
        실시간 최신 게시글
      </h3>
      <div className="w-full min-h-[360px]">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MainPostItemSkeleton key={index} />
          ))
        ) : isError || newPosts?.length === 0 ? (
          <MyPagePostEmpty width="w-[419px]" height="h-[428px]" />
        ) : (
          newPosts?.map((post, index) => (
            <NewPostItem key={index} newPosts={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default NewPost;

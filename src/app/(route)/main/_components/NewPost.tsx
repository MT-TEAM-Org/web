import React from "react";
import NewPostItem from "./NewPostItem";
import useGetNewContent from "@/_hooks/fetcher/main/useGetNewContent";
import MainPostItemSkeleton from "./MainPostItemSkeleton";
import MyPagePostEmpty from "../../mypage/posts/_components/MypagePostEmpty";
import { cn } from "@/utils";

const NewPost = () => {
  const { data: response, isLoading, isError } = useGetNewContent();
  const newPosts = response?.data?.data;

  return (
    <div
      className={cn(
        "w-full min-h-[392px] flex flex-col gap-2",
        "mobile:min-h-[auto] mobile:h-fit"
      )}
    >
      <h3
        className={cn(
          "font-[700] text-[16px] leading-6 tracking-[-0.02em] align-center hidden",
          "pc:block"
        )}
      >
        실시간 최신 게시글
      </h3>
      <div
        className={cn(
          "w-full min-h-[360px]",
          "mobile:min-h-[auto] mobile:h-fit"
        )}
      >
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MainPostItemSkeleton key={index} />
          ))
        ) : isError || newPosts?.length === 0 ? (
          <MyPagePostEmpty
            width="w-[419px] mobile:w-full tablet:w-full"
            height="h-[428px]"
            isHome
          />
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

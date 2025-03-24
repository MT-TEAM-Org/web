import React from "react";
import HotPostItem from "./hotPostItem";
import useGetHotPost from "@/_hooks/fetcher/main/useGetHotPost";

const hotPost = () => {
  const { data: response } = useGetHotPost();
  const hotPosts = response?.data || [];

  const displayPosts = hotPosts.slice(0, 10);

  return (
    <div className="w-full min-h-[392px] flex flex-col gap-2">
      {/* 목 데이터 */}
      <h3 className="font-[700] text-[16px] leading-6 tracking-[-0.02em] align-center">
        실시간 HOT 게시글
      </h3>
      <div className="w-full min-h-[360px]">
        {displayPosts.map((post, index) => (
          <HotPostItem key={post.id} number={index + 1} hotPosts={post} />
        ))}
      </div>
    </div>
  );
};

export default hotPost;

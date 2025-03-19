import React from "react";
import HotPostItem from "./hotPostItem";

const hotPost = () => {
  return (
    <div className="w-full min-h-[392px] flex flex-col gap-2">
      {/* 목 데이터 */}
      <h3 className="font-[700] text-[16px] leading-6 tracking-[-0.02em] align-center">
        실시간 HOT 게시글
      </h3>
      <div className="w-full min-h-[360px]">
        {Array.from({ length: 10 }).map((_, index) => (
          <HotPostItem key={index} number={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default hotPost;

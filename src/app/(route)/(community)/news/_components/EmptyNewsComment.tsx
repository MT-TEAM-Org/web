import React from "react";
import Image from "next/image";

const EmptyNewsComment = () => {
  return (
    <div className="w-[672px] h-[260px] bg-gray1 flex items-center justify-center border-t overflow-hidden">
      <div className="w-full h-[80px] flex flex-col gap-4 items-center justify-center">
        <Image
          src="/Empty_news.png"
          alt="Empty news"
          width={148.62}
          height={40}
        />
        <p className="w-full h-[24px] font-bold text-[700] leading-[24px] tracking-[-0.02em] text-center">
          등록된 댓글이 없습니다.
        </p>
      </div>
    </div>
  );
};

export default EmptyNewsComment;

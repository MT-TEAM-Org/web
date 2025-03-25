import React from "react";
import Image from "next/image";

const EmptyNewsComment = () => {
  return (
    <div className="w-[672px] h-[184px] bg-gray1 rounded-[10px] py-10 flex items-center justify-center border-t overflow-hidden">
      <div className="w-full h-[80px] flex flex-col gap-4 items-center justify-center">
        <Image
          src="/Empty_news.png"
          alt="Empty news"
          width={148.62}
          height={40}
        />
        <div className="w-full min-h-[48px] flex flex-col gap-1 text-center">
          <p className="font-bold text-[16px] leading-6 tracking-[-0.02em]">
            등록된 댓글이 없습니다.
          </p>
          <p className="text-[14px] leading-5">
            이야기 나누고 싶다면 댓글을 남겨보세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyNewsComment;

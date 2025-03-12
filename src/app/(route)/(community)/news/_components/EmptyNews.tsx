import React from "react";
import Image from "next/image";

const EmptyNews = () => {
  return (
    <div className="w-[720px] h-[248px] top-[370px] left-[536px] rounded-[10px] bg-gray1">
      <div className="w-[720px] h-[80px] flex flex-col gap-4 items-center py-[84px]">
        <Image
          src="/Empty_news.png"
          alt="Empty news"
          width={148.62}
          height={40}
        />
        <p className="w-full h-[24px] font-bold text-[700] leading-[24px] tracking-[-0.02em] text-center">
          등록된 뉴스가 없습니다.
        </p>
      </div>
    </div>
  );
};

export default EmptyNews;

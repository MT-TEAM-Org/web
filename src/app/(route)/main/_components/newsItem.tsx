import React from "react";
import Image from "next/image";

const NewsItem = () => {
  return (
    <div className="flex items-center min-w-[436px] max-h-[68px] p-2 border-gray-300 cursor-pointer">
      <div className="flex-shrink-0 max-w-[68px] max-h-[68px] rounded overflow-hidden bg-gray-300">
        <Image
          src="/NewsItem_fake2.png"
          alt="News img"
          width={68}
          height={68}
          className="max-w-[68px] min-h-[68px] rounded-[4.25px]"
        />
      </div>
      <div className="w-[368px] h-[68px] flex flex-col justify-center px-4 gap-1">
        <h2 className="font-[700] text-[16px] leading-6">
          유승민, “체육인 위한 민원해결사 되겠다...단일화
        </h2>
        <p className="font-[500] text-[14px] leading-5">
          제42대 대한체육회 회장 선거에 출마한 유승민(42) 전 IOC 위원은 공식
          선거운동 첫날인 26일 오후 2시 서울
        </p>
      </div>
    </div>
  );
};

export default NewsItem;

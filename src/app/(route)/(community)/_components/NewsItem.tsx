import React from 'react';
import Image from 'next/image';

const NewsItem = () => {
  return (
    <div className="max-w-[288px] min-h-[92px] flex justify-start items-center border-b border-[#EEEEEE] p-3 cursor-pointer gap-1">
      <Image src="/NewsItem_fake2.png" alt="news img" width={80} height={80} className="max-w-[80px] min-h-[80px] bg-gray-300 mr-4 rounded-[4.25px] flex-shrink-0" />
      <div className="max-w-[184px] min-h-[68px] flex flex-col justify-center gap-2">
        <div className="font-bold text-[#181818] leading-tight">
          유승민, "체육인 위한 민...
        </div>
        <div className="text-sm text-gray-600 mt-1 leading-snug opacity-90">
          제42대 대한체육회 회장 선거에 출마한 유승민(42) 전 IOC...
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
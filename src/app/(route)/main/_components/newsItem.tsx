import React from 'react';
import Image from 'next/image';

const NewsItem = () => {
  return (
    <div className="flex items-center max-h-[68px] p-2 border-gray-300 cursor-pointer">
      <div className="flex-shrink-0 max-w-[68px] max-h-[68px] rounded overflow-hidden bg-gray-300 mr-2">
        <Image src="/NewsItem_fake2.png" alt="News img" width={68} height={68} className="max-w-[68px] min-h-[68px] object-cover rounded-md"/>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-1 mb-2">
          유승민, “체육인 위한 민원해결사 되겠다... 단일화는”
        </h2>
        <p className="text-xs text-gray-600 leading-tight break-words line-clamp-2">
          제42대 대한체육회 회장 선거에 출마한 유승민(42) 전 IOC 위원은 공식 선거운동 첫날인 26일 오후 2시 서울 종로구 자...
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
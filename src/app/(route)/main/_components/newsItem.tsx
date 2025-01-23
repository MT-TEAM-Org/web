import React from 'react';

const NewsItem = () => {
  return (
    <div className="flex items-center h-[68px] p-2 border-gray-300">
      <div className="flex-shrink-0 w-[68px] h-[68px] rounded overflow-hidden bg-gray-300 mr-2">
        {/* img */}
        <div
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        {/* title */}
        <h2 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-1 mb-2">
          유승민, “체육인 위한 민원해결사 되겠다... 단일화는”
        </h2>
        {/* text */}
        <p className="text-xs text-gray-600 leading-tight break-words line-clamp-2">
          제42대 대한체육회 회장 선거에 출마한 유승민(42) 전 IOC 위원은 공식 선거운동 첫날인 26일 오후 2시 서울 종로구 자...
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
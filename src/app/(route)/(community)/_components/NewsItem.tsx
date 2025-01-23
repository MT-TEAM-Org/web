import React from 'react';

const NewsItem = () => {
  return (
<div className="w-[288px] h-[92px] flex justify-start items-center border-b border-[#EEEEEE] p-2 cursor-pointer">
  {/* 이미지 대신 div */}
  <div className="w-[68px] h-[68px] bg-gray-300 mr-4 rounded-lg flex-shrink-0"></div>
  <div className="flex flex-col justify-center">
    <div className="font-bold text-sm text-gray-900 leading-tight">
      유승민, "체육인 위한 민원...
    </div>
    <div className="text-xs text-gray-600 mt-1 leading-snug">
      제42대 대한체육회 회장 선거에 출마한 유승민(42) 전 IOC 위...
    </div>
  </div>
</div>
  );
};

export default NewsItem;
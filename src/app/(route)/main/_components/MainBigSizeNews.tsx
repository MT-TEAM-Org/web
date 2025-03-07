"use client";

import React, { useState } from "react";
import Image from "next/image";
import useGetNewsDataList from "@/_hooks/useNews/useGetNewsDataList";
import { useRouter } from "next/navigation";
import { useReadNews } from "@/_hooks/useNews/useReadNews";

const MainBigSizeNews = () => {
  const router = useRouter();
  const { data, isLoading } = useGetNewsDataList();
  const mainPageData = data ? data[0] : null;
  const updatedImgUrl = mainPageData?.thumbImg?.replace(
    "type=w140",
    "type=w410"
  );
  const { handleRead } = useReadNews(mainPageData?.id, false);

  console.log(mainPageData);

  const handleToNewsInfo = () => {
    router.push(`/news/news-detail/${mainPageData?.id}`);
  };

  const handleClick = () => {
    handleRead();
    handleToNewsInfo();
  };

  return (
    <div
      className="relative w-[410px] h-[236px] rounded-[10px] overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={mainPageData?.thumbImg ? updatedImgUrl : "/Empty_news.png"}
        // 임시 이미지, 스켈레톤 UI 들어오면 지울 예정
        alt="main news"
        width={410}
        height={236}
        className="w-[410px] h-[236px] rounded-[10px] object-cover"
      />
      <div className="absolute top-[128px] w-[410px] min-h-[108px] py-4 flex flex-col gap-2 bg-gradient-to-b from-[#00000000] to-[#000000]">
        <h3 className="w-[410px] h-[28px] font-bold text-[18px] leading-7 text-[#FFFFFF] tracking-[0.04em] text-ellipsis overflow-hidden whitespace-nowrap">
          {isLoading ? "Loading..." : mainPageData?.title}
        </h3>
        <p className="w-[410px] h-[40px] opacity-90 font-medium text-[14px] leading-5 text-[#FFFFFF] line-clamp-2 overflow-hidden">
          {mainPageData?.content}
        </p>
      </div>
    </div>
  );
};

export default MainBigSizeNews;

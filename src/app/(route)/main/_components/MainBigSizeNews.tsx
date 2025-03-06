"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useGetNewsDataList from "@/_hooks/useNews/useGetNewsDataList";
import { useReadNews } from "@/_hooks/useNews/useReadNews";
import { updateImageUrl } from "@/utils/newsUtils/updatedImgUrl";

const MainBigSizeNews = () => {
  const { data, isLoading } = useGetNewsDataList();
  const mainPageData = data ? data[0] : null;
  const updatedImgUrl = updateImageUrl(mainPageData?.thumbImg, "w410");
  const { handleRead } = useReadNews(mainPageData?.id, false);

  console.log(mainPageData);

  const categoryPath = mainPageData?.category?.toLowerCase() || "";

  return (
    <Link
      href={`/news${categoryPath ? `/${categoryPath}` : ""}/news-detail/${
        mainPageData?.id
      }`}
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
    </Link>
  );
};

export default MainBigSizeNews;

"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReadNews } from "@/app/(route)/news/_utils/useReadNews";
import MainBigSizeNewsSkeleton from "../state/MainBigSizeNewsSkeleton";
import CustomIcon from "@/app/_components/IconComponents";
import { NewsItemType } from "../../../news/_types/newsItemType";
import { cn } from "@/utils";

interface MainBigSizeNEwsProps {
  data: NewsItemType[] | undefined;
  isLoading: boolean;
}

const MainBigSizeNews = ({ data, isLoading }: MainBigSizeNEwsProps) => {
  const router = useRouter();

  const mainPageData = data?.[0];
  const { handleRead } = useReadNews(mainPageData?.id, false);
  const categoryPath = mainPageData?.category?.toLowerCase() || "";

  const handleClick = () => {
    if (!mainPageData) return;
    handleRead();
    router.push(
      `/news${categoryPath ? `/${categoryPath}` : ""}/news-detail/${
        mainPageData.id
      }`
    );
  };

  if (isLoading) return <MainBigSizeNewsSkeleton />;

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative w-[410px] h-[236px] rounded-[10px] overflow-hidden cursor-pointer hidden",
        "pc:block"
      )}>
      {mainPageData?.thumbImg ? (
        <Image
          src={mainPageData?.thumbImg}
          alt="main news"
          width={410}
          height={236}
          className="w-[410px] h-[236px] rounded-[5px] object-cover"
        />
      ) : (
        <CustomIcon
          icon="DEFAULT_THUMBNAIL_ICON"
          className="w-[410px] h-[236px] border rounded-none"
        />
      )}
      {(mainPageData?.title || mainPageData?.content) && (
        <div className="absolute top-[128px] w-[410px] min-h-[108px] p-4 flex flex-col gap-2 bg-gradient-to-b from-[#00000000] to-[#000000]">
          <h3 className="w-full h-[28px] font-bold text-[18px] leading-7 text-white tracking-[0.04em] text-ellipsis overflow-hidden whitespace-nowrap">
            {mainPageData?.title}
          </h3>
          <p className="w-full h-[40px] opacity-90 font-medium text-[14px] leading-5 text-white line-clamp-2 overflow-hidden">
            {mainPageData?.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default MainBigSizeNews;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useReadNews } from "@/_hooks/useNews/useReadNews";
import { updateImageUrl } from "@/utils/newsUtils/updatedImgUrl";
import MainBigSizeNewsSkeleton from "./MainBigSizeNewsSkeleton";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";

const MainBigSizeNews = () => {
  const { data, isLoading } = useGetNewsDataList({
    page: "1",
    orderType: "VIEW",
    size: 1,
    timePeriod: "WEEKLY",
    withPageInfo: false,
  });

  const mainPageData = data?.[0];
  const updatedImgUrl = updateImageUrl(mainPageData?.thumbImg, "w410");
  const { handleRead } = useReadNews(mainPageData?.id, false);
  const categoryPath = mainPageData?.category?.toLowerCase() || "";

  if (isLoading) return <MainBigSizeNewsSkeleton />;
  return (
    <Link
      href={`/news${categoryPath ? `/${categoryPath}` : ""}/news-detail/${
        mainPageData?.id
      }`}
    >
      <div
        onClick={handleRead}
        className="relative w-[410px] h-[236px] rounded-[10px] overflow-hidden cursor-pointer"
      >
        <Image
          src={mainPageData?.thumbImg ? updatedImgUrl : "/Empty_news.png"}
          alt="main news"
          width={410}
          height={236}
          className="w-[410px] h-[236px] rounded-[5px] object-cover"
        />
        <div className="absolute top-[128px] w-[410px] min-h-[108px] p-4 flex flex-col gap-2 bg-gradient-to-b from-[#00000000] to-[#000000]">
          <h3 className="w-full h-[28px] font-bold text-[18px] leading-7 text-white tracking-[0.04em] text-ellipsis overflow-hidden whitespace-nowrap">
            {mainPageData?.title}
          </h3>
          <p className="w-full h-[40px] opacity-90 font-medium text-[14px] leading-5 text-white line-clamp-2 overflow-hidden">
            {mainPageData?.content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MainBigSizeNews;

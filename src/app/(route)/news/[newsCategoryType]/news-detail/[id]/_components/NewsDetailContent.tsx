"use client";

import PostAction from "@/app/(route)/(community)/_components/PostAction";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import ChangedCategory from "@/app/(route)/news/_utils/changedCategory";
import Image from "next/image";
import { cn } from "@/utils";
import React from "react";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import useTimeAgo from "@/utils/useTimeAgo";

interface NewsDetailContentProps {
  newsInfoData: NewsListType;
  handleNewsCommend: () => void;
}

const NewsDetailContent = ({
  newsInfoData,
  handleNewsCommend,
}: NewsDetailContentProps) => {
  const formattedTime = useTimeAgo(newsInfoData?.postDate);

  const infoItems = [
    { label: "조회수", value: newsInfoData?.viewCount },
    { label: "댓글", value: newsInfoData?.commentCount },
    { label: "추천", value: newsInfoData?.recommendCount },
  ];

  return (
    <article
      className={cn(
        "w-[720px] h-auto rounded-t-[5px] p-6 flex gap-4 flex-col shadow-soft-md bg-white",
        "tablet:max-w-full tablet:w-auto",
        "mobile:max-w-full mobile:w-full mobile:p-4 mobile:gap-3"
      )}
      aria-label="뉴스 본문"
    >
      <div className="w-full h-auto flex flex-col gap-2">
        <header>
          <h1
            className={cn(
              "w-full h-auto font-bold text-[18px] leading-7 tracking-[-0.72px] text-gray8",
              "tablet:text-[18px] tablet:leading-7 tablet:tracking-[-0.72px] tablet:font-bold",
              "mobile:text-[16px] mobile:leading-6 mobile:tracking-[-0.02em]"
            )}
          >
            {newsInfoData?.title}
          </h1>
        </header>

        <div
          className={cn(
            "w-full h-auto min-h-[20px] gap-4 flex justify-between text-gray2",
            "mobile:flex-wrap mobile:h-[40px] mobile:gap-1"
          )}
        >
          <div className="flex gap-2 text-gray6 font-[700] leading-5 text-[14px] items-center">
            <div
              className={cn(
                "flex gap-1 text-[14px] leading-5 font-bold",
                "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
              )}
            >
              <ChangedCategory category={newsInfoData?.category} />
              <p className="font-medium">{formattedTime}</p>
            </div>
            <div
              className={cn(
                "flex gap-2 font-medium text-[14px] leading-5",
                "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
              )}
            >
              {infoItems.map((item) => (
                <p key={item.label} className="font-bold flex gap-1">
                  {item.label}
                  <span className="font-[500]">{item.value}</span>
                </p>
              ))}
            </div>
          </div>
          <div
            className={cn(
              "text-[14px] flex justify-end font-[500] leading-5 gap-1 text-gray6",
              "tablet:min-w-[210px]",
              "mobile:text-[12px] mobile:h-[18px] mobile:tracking-[-0.02em] mobile:w-full mobile:justify-start"
            )}
          >
            <p>네이버 스포츠</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full h-auto flex flex-col items-center justify-start gap-3">
        {newsInfoData?.thumbImg && (
          <Image
            src={newsInfoData ? newsInfoData?.thumbImg : "/Empty_news.png"}
            alt="News detail img"
            width={672}
            height={338}
            className="object-cover mobile:h-auto"
          />
        )}
        <p
          className={cn(
            "font-[500] text-[16px] leading-6 tracking-[-0.02em] text-gray7 overflow-hidden line-clamp-2",
            "mobile:text-[14px] mobile:leading-5"
          )}
        >
          {newsInfoData?.content}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <RecommendButton
          handleCommend={handleNewsCommend}
          recommendCount={newsInfoData?.recommendCount}
          isRecommend={newsInfoData?.recommend}
        />
      </div>

      <div className={cn("mobile:hidden")}>
        <PostAction type="news" source={newsInfoData?.source} />
      </div>
    </article>
  );
};

export default NewsDetailContent;

"use client";

import PostAction from "@/app/(route)/(community)/_components/PostAction";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import { cn } from "@/utils";
import React from "react";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import NewsDetailMeta from "./NewsDetailMeta";
import NewsContent from "./NewsContent";

interface NewsDetailContentProps {
  newsInfoData: NewsListType;
  handleNewsCommend: () => void;
}

const NewsDetailContent = ({
  newsInfoData,
  handleNewsCommend,
}: NewsDetailContentProps) => {
  return (
    <article
      className={cn(
        "w-[720px] h-auto rounded-t-[5px] p-6 flex gap-4 flex-col shadow-soft-md bg-white",
        "tablet:max-w-full tablet:w-auto",
        "mobile:max-w-full mobile:w-full mobile:p-4 mobile:gap-3"
      )}
      aria-label="뉴스 본문"
    >
      {/* 게시글 상단 메타 정보 */}
      <NewsDetailMeta newsInfoData={newsInfoData} />
      <hr />
      {/* 게시글 본문 */}
      <NewsContent newsInfoData={newsInfoData} />

      {/* 게시글 추천 버튼 */}
      <RecommendButton
        handleCommend={handleNewsCommend}
        recommendCount={newsInfoData?.recommendCount}
        isRecommend={newsInfoData?.recommend}
      />

      {/* 게시글 공유 버튼 */}
      <PostAction type="news" source={newsInfoData?.source} />
    </article>
  );
};

export default NewsDetailContent;

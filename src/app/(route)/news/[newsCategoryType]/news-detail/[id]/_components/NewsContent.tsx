import React from "react";
import Image from "next/image";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { cn } from "@/utils";

interface NewsContentProps {
  newsInfoData: NewsListType;
}

const NewsContent = ({ newsInfoData }: NewsContentProps) => {
  return (
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
  );
};

export default NewsContent;

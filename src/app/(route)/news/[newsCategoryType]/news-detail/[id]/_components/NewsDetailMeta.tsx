import React from "react";
import { cn } from "@/utils";
import ChangedCategory from "@/app/(route)/news/_utils/changedCategory";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import useTimeAgo from "@/utils/useTimeAgo";

interface NewsDetailMetaProps {
  newsInfoData: NewsListType;
}

const NewsDetailMeta = ({ newsInfoData }: NewsDetailMetaProps) => {
  const formattedTime = useTimeAgo(newsInfoData?.postDate);

  const infoItems = [
    { label: "조회수", value: newsInfoData?.viewCount },
    { label: "댓글", value: newsInfoData?.commentCount },
    { label: "추천", value: newsInfoData?.recommendCount },
  ];

  return (
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
  );
};

export default NewsDetailMeta;

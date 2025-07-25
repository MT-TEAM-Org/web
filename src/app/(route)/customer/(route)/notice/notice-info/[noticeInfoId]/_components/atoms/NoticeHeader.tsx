import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";
import { cn } from "@/utils";
import useTimeAgo from "@/utils/useTimeAgo";
import React from "react";

interface NoticeHeaderProps {
  data: NoticeInfoItemType;
}

const NoticeHeader = ({ data }: NoticeHeaderProps) => {
  const timeAgo = useTimeAgo(data?.createdAt);

  const noticeStats = [
    { label: "조회수", value: data?.viewCount },
    { label: "댓글", value: data?.commentCount },
    { label: "추천", value: data?.recommendCount },
  ];

  return (
    <div
      className={cn(
        "w-full max-w-[672px] min-h-[56px] flex gap-2 flex-col",
        "tablet:max-w-full",
        "mobile:max-w-full mobile:min-h-[68px] mobile:gap-1"
      )}
    >
      <h1
        className={cn(
          "font-bold text-[18px] leading-7 tracking-[-0.72px] text-black",
          "mobile:text-[16px] mobile:tracking-[-0.02em]"
        )}
      >
        {data?.title}
      </h1>
      <div
        className={cn(
          "min-h-[20px] flex gap-4 justify-between",
          "mobile:flex-col mobile:gap-1 mobile:min-h-[18px]"
        )}
      >
        <div
          className={cn(
            "min-h-[20px] flex gap-2",
            "mobile:gap-1 mobile:min-h-[18px]"
          )}
        >
          <div
            className={cn(
              "min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6",
              "mobile:min-h-[18px] mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
            )}
          >
            <p className="font-bold">고객센터</p>
            <p>공지사항</p>
            <p>{timeAgo}</p>
          </div>
          <div className="flex gap-2">
            {noticeStats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-1 text-[14px] leading-5 text-gray6",
                  "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
                )}
              >
                <p className="font-bold">{stat.label}</p>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6 text-nowrap",
            "tablet:min-w-0 tablet:flex-shrink tablet:justify-end tablet:overflow-hidden",
            "mobile:min-h-[18px] mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
          )}
        >
          <p>{data?.nickname}</p>
          <p>{data?.clientIp}</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;

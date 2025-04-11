"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalculateTime } from "@/app/_components/CalculateTime";
import { highlightText } from "@/utils/searchHighlightText";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { cn } from "@/utils";
import isWithin24Hours from "@/utils/isWithIn24Hours";

interface MyPageInquiriesItemProps {
  data: {
    id: number;
    content: string;
    clientIp: string;
    createdAt: string;
    publicId: string;
    nickname: string;
    isAdminAnswered: string;
    commentCount: number;
    commentSearchList?: {
      comment: string;
      imageUrl: string;
    };
  };
}

const MyPageInquiriesItem = ({ data }: MyPageInquiriesItemProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || null;
  const searchType = searchParams.get("search_type") || null;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const isWithIn24Hours = isWithin24Hours(data?.createdAt);

  return (
    <Link
      href={`/mypage/inquiries/${data?.id}?page=${page}`}
      className="flex items-center gap-[12px] w-full min-h-[66px] border-b-[1px] border-[#FAFAFA] p-[12px] hover:bg-bg0"
    >
      <div className="flex items-center justify-center min-w-[65px] h-[32px] rounded-[2px] px-[8px] py-[4px] bg-[#FAFAFA]">
        <p
          className={`font-[700] text-[14px] leading-[20px] ${
            data?.isAdminAnswered === "답변완료"
              ? "text-[#00ADEE]"
              : "text-gray7"
          }`}
        >
          {data?.isAdminAnswered}
        </p>
      </div>
      <div className="w-full min-h-[42px] flex flex-col gap-[4px]">
        <div
          className={cn(
            "w-[619px] flex items-center gap-[2px]",
            "tablet:w-full",
            "mobile:w-full"
          )}
        >
          <h2 className="text-[14px] leading-[20px] overflow-hidden text-ellipsis line-clamp-1 text-gray7">
            {highlightText(data?.content, searchType, search)}
          </h2>
          {data?.commentCount ? (
            <p className="text-gra font-medium text-[12px] leading-[18px]">
              [{data?.commentCount}]
            </p>
          ) : null}
          {isWithIn24Hours && (
            <span className="font-black text-[10px] leading-[18px] text-gra">
              N
            </span>
          )}
        </div>
        <div className="flex gap-[4px] text-gray5 text-[12px] leading-[18px]">
          <span className="font-[700] whitespace-nowrap">문의</span>
          <span className="whitespace-nowrap">
            {CalculateTime(data?.createdAt)}
          </span>
          <span className="overflow-hidden text-ellipsis line-clamp-1">
            {data?.nickname}
          </span>
          <span className="text-gray4 whitespace-nowrap">
            IP {data?.clientIp}
          </span>
        </div>
        {data?.commentSearchList && (
          <div className="flex items-center min-h-[18px]">
            <div className="flex justify-center items-center w-[16px] h-[16px]">
              <Arrow_reply size={12} />
            </div>
            <div className="text-[12px] leading-[18px] text-gray7 overflow-hidden text-ellipsis line-clamp-1">
              {data?.commentSearchList?.imageUrl && "(이미지)"}{" "}
              {highlightText(
                data?.commentSearchList.comment,
                searchType,
                search
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MyPageInquiriesItem;

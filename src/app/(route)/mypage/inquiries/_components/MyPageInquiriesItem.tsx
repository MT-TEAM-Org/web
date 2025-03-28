"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useInquiryPostIdStore } from "@/utils/Store";
import { CalculateTime } from "@/app/_components/CalculateTime";

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
  };
}

const MyPageInquiriesItem = ({ data }: MyPageInquiriesItemProps) => {
  const searchParams = useSearchParams();
  const { inquiryPostIds } = useInquiryPostIdStore();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const isInquiryPostIdExists = () => {
    return inquiryPostIds.includes(data?.id);
  };

  return (
    <Link
      href={`/mypage/inquiries/${data?.id}?page=${page}`}
      className="flex items-center gap-[12px] w-full min-h-[66px] border-b-1 border-[#FAFAFA] p-[12px]"
    >
      <div className="min-w-[65px] h-[32px] rounded-[2px] px-[8px] py-[4px] bg-[#FAFAFA]">
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
        <div className="w-[619px] flex items-center gap-[2px]">
          <h2
            className={`text-[14px] leading-[20px] overflow-hidden whitespace-nowrap text-ellipsis ${
              isInquiryPostIdExists() ? "text-gray5" : "text-gray7"
            }`}
          >
            {data?.content}
          </h2>
          <p className="text-Primary font-medium text-[12px] leading-[18px]">
            [{data?.commentCount}]
          </p>
          <span className="font-black text-[10px] leading-[18px] text-primary">
            N
          </span>
        </div>
        <div className="flex gap-[4px] text-gray5 text-[12px] leading-[18px]">
          <span className="font-[700]">문의</span>
          <span>{CalculateTime(data?.createdAt)}</span>
          <span>{data?.nickname}</span>
          <span className="text-gray4">IP {data?.clientIp}</span>
        </div>
      </div>
    </Link>
  );
};

export default MyPageInquiriesItem;

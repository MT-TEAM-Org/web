"use client";

import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import Refresh from "@/app/_components/icon/Refresh";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import { use } from "react";
import useGetInquiriesDetail from "@/_hooks/useMypage/useGetInquiriesDetail";
import useDeleteInquiriesDetail from "@/_hooks/useMypage/useDeleteInquiriesDetail";
import { useRouter } from "next/navigation";

interface InquirieDetailProps {
  id: string;
}

interface InquirieDetailData {
  clientIp: string;
  commentCount: number;
  content: string;
  createdAt: string;
  inquiryId: string;
  nickname: string;
  publicID: string;
}

const InquirieDetail = ({
  params,
}: {
  params: Promise<InquirieDetailProps>;
}) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const { data, isLoading } = useGetInquiriesDetail(id);
  const { mutate: deleteInquiriesDetail } = useDeleteInquiriesDetail();
  const inquirieDetail: InquirieDetailData = data?.data;

  const buttons = [
    { text: "이전글", icon: Arrow_up },
    { text: "다음글", icon: Arrow_down },
    { text: "댓글 맨위로", icon: Arrow_up },
    { text: "게시글 맨위로", icon: Double_arrow_up },
  ];

  const handleDelete = () => {
    deleteInquiriesDetail(id, {
      onSuccess: () => {
        router.replace("/mypage/inquiries");
      },
      onError: () => {
        alert("삭제에 실패했습니다.");
      },
    });
  };

  const buttonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-gray3 pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px] text-7";
  return (
    <div className="flex flex-col justify-center gap-[16px] w-[720px] min-h-[497px] rounded-b-[5px] p-[24px] bg-white">
      <h1 className="text-[18px] font-[700] leading-[28px] text-gray8">
        나의 문의내역 상세
      </h1>
      <div className="flex justify-between items-center text-[14px] leading-[20px] text-gray6">
        <div className="flex gap-[8px]">
          <span className="font-[700]">마이페이지</span>
          <span>나의 문의내역</span>
          <span>1분 전</span>
          <span>
            <span className="font-[700]">댓글</span>{" "}
            {inquirieDetail?.commentCount}
          </span>
        </div>
        <div className="flex gap-[4px]">
          <span>{inquirieDetail?.nickname}</span>
          <span>IP {inquirieDetail?.clientIp}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          className="flex justify-center items-center w-[49px] h-[32px] rounded-[5px] border-1 border-gray3 px-[9px] py-[12px] text-[14px] text-gray7"
        >
          삭제
        </button>
      </div>
      <div className="h-[1px] border"></div>
      <p className="min-h-[48px] leading-[24px] text-gray7">
        {inquirieDetail?.content}
      </p>

      <div className="min-h-[232px] bg-gray1 rounded-t-[5px] rounded-b-[10px]">
        <div className="flex justify-between items-center min-h-[48px] py-[4px] pl-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="font-[700] text-[18px] leading-[28px] text-gray8">
              댓글
            </span>
            <span className="text-[14px] leading-[20px] text-gray5">
              총 0개
            </span>
          </div>
          <div className="max-w-[101px] min-h-[40px] flex items-center px-[12px] py-[10px] gap-[8px] bg-[#FAFAFA] rounded-md">
            <div className="cursor-pointer">
              <Refresh />
            </div>
            <p className="font-bold text-[14px] leading-[14px] text-gray6">
              새로고침
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[16px] min-h-[184px] py-[40px]">
          <div className="opacity-30">
            <LogoWhite />
          </div>
          <div className="flex flex-col items-center gap-[4px] text-gray7">
            <p className="font-[700] leading-[24px]">등록된 댓글이 없습니다.</p>
            <p className="text-[14px] leading-[20px]">
              이야기 나누고 싶다면 댓글을 남겨보세요.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between min-h-[40px]">
        <div className="flex gap-[8px]">
          {buttons.slice(0, 2).map(({ text, icon: Icon }, index) => (
            <button key={index} className={buttonStyle}>
              <Icon />
              {text}
            </button>
          ))}
        </div>

        <div className="flex gap-[8px]">
          {buttons.slice(2).map(({ text, icon: Icon }, index) => (
            <button key={index + 2} className={buttonStyle}>
              <Icon />
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InquirieDetail;

"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import { Suspense, use, useEffect, useRef, useState } from "react";
import useGetInquiriesDetail from "@/_hooks/fetcher/mypage/useGetInquiriesDetail";
import { useRouter } from "next/navigation";
import MyPageInquiriesList from "../_components/MyPageInquiriesList";
import { useInquiryPostIdStore } from "@/utils/Store";
import MyPageInquirieSendCommentBox from "../_components/MyPageInquirieSendCommentBox";
import MyPageInquirieComment from "../_components/MyPageInquirieComment";

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

interface parentsComment {}

const InquirieDetail = ({
  params,
}: {
  params: Promise<InquirieDetailProps>;
}) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const { data, isLoading } = useGetInquiriesDetail(id);
  const inquirieDetail: InquirieDetailData = data?.data;
  const comments = useRef(null);
  const { addInquiryPostId, removeInquiryPostId } = useInquiryPostIdStore();
  const [parentsComment, setParentsComment] = useState();

  useEffect(() => {
    if (!id) return;
    addInquiryPostId(Number(id));
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onHandleToTop = () => {
    if (comments.current) {
      const navBarHeight = 130; // 네비게이션 바 높이
      const y =
        comments.current.getBoundingClientRect().top +
        window.scrollY -
        navBarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNextPrevRoute = (state: "next" | "prev") => {
    if (state === "next") {
      router.push(`/mypage/inquiries/${Number(id) + 1}`);
    } else {
      router.push(`/mypage/inquiries/${Number(id) - 1}`);
    }
  };

  const buttons = [
    {
      text: "이전글",
      icon: Arrow_up,
      onClick: () => handleNextPrevRoute("prev"),
    },
    {
      text: "다음글",
      icon: Arrow_down,
      onClick: () => handleNextPrevRoute("next"),
    },
    { text: "댓글 맨위로", icon: Arrow_up, onClick: onHandleToTop },
    { text: "게시글 맨위로", icon: Double_arrow_up, onClick: scrollToTop },
  ];

  const buttonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-gray3 pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px] text-7";
  return (
    <div className="space-y-[12px]">
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
        <div className="h-[1px] border"></div>
        <p className="min-h-[48px] leading-[24px] text-gray7">
          {inquirieDetail?.content}
        </p>
        <MyPageInquirieComment
          ref={comments}
          id={inquirieDetail?.inquiryId}
          publicId={data?.data?.publicID}
        />
        <div className="flex justify-between min-h-[40px]">
          <div className="flex gap-[8px]">
            {buttons.slice(0, 2).map(({ text, icon: Icon, onClick }, index) => (
              <button key={index} className={buttonStyle} onClick={onClick}>
                <Icon />
                {text}
              </button>
            ))}
          </div>

          <div className="flex gap-[8px]">
            {buttons.slice(2).map(({ text, icon: Icon, onClick }, index) => (
              <button key={index + 2} className={buttonStyle} onClick={onClick}>
                <Icon />
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Suspense fallback={""}>
        <div className="max-w-[720px] min-h-[450px] bg-[#FAFAFA] rounded-[5px]">
          <MyPageInquiriesList />
        </div>
      </Suspense>
      <div className="shadow-md sticky bottom-0">
        <MyPageInquirieSendCommentBox id={id} />
      </div>
    </div>
  );
};

export default InquirieDetail;

"use client";

import { useToast } from "@/_hooks/useToast";
import Copy from "@/app/_components/icon/Copy";
import Share from "@/app/_components/icon/Share";
import ReportModalPopUp from "@/app/_components/ReportModalPopUp";
import ShareModalPopUp from "@/app/_components/ShareModalPopUp";
import Link from "next/link";
import React, { useState } from "react";

interface PostActionProps {
  type: "news" | "community";
  source?: string;
  onReport?: () => void;
}

const PostAction = ({ type, onReport, source }: PostActionProps) => {
  const [activeModal, setActiveModal] = useState(false);
  const [activeReportModal, setActiveReportModal] = useState(false);
  const url = window.location.href;
  const toast = useToast();

  const modalPopUp = () => {
    setActiveModal((prev) => !prev);
  };

  const copyBtn = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(
        "주소가 복사되었습니다.",
        "원하는 곳에 붙여넣기를 해주세요."
      );
    } catch (err) {
      toast.error("주소가 복사되지 않았습니다.", "다시 시도 해주세요.");
    }
  };

  const handleReport = () => {
    setActiveReportModal(true);
    if (onReport) {
      onReport();
    }
  };

  return (
    <div className="w-full h-auto flex justify-between">
      {type === "news" ? (
        <Link
          href={`${source}`}
          target="_blank"
          className="min-w-[104px] w-auto min-h-[32px] rounded-[5px] text-[14px] font-[500] leading-[14px] flex items-center justify-center bg-white px-3 py-[9px] border border-gray3"
        >
          기사 원문 보기
        </Link>
      ) : (
        <button
          onClick={handleReport}
          className="w-full max-w-[73px] min-h-[32px] rounded-[5px] text-[14px] font-[500] leading-[14px] flex items-center justify-center bg-white px-3 py-[9px] border border-gray3 whitespace-nowrap"
        >
          신고하기
        </button>
      )}
      <div className="max-w-[237px] min-h-[35px] flex gap-2">
        <button
          onClick={copyBtn}
          className="min-w-[138px] w-auto h-[32px] flex justify-center items-center bg-white px-2 pr-3 pl-[10px] gap-1 rounded-[5px] border border-gray3 text-[14px] leading-[14px] font-medium whitespace-nowrap"
        >
          <Copy />
          게시글 URL 복사
        </button>
        <button
          onClick={modalPopUp}
          className="min-w-[91px] w-auto h-[32px] flex justify-center items-center bg-white pr-[12px] pl-[10px] py-2 rounded-[5px] border border-gray3 text-[14px] leading-[14px] text-nowrap font-medium"
        >
          <Share />
          공유하기
        </button>
      </div>
      {activeModal && (
        <ShareModalPopUp setActiveModal={setActiveModal} url={url} />
      )}
      {activeReportModal && (
        <ReportModalPopUp setActiveModal={setActiveReportModal} />
      )}
    </div>
  );
};

export default PostAction;

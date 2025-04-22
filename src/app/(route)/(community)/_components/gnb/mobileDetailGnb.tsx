"use client";

import useGetBoardDetail from "@/_hooks/getBoardDetail";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import ShareModalPopUp from "@/app/_components/ShareModalPopUp";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MobileDetailGnbProps {
  boardId: string;
}

const MobileDetailGnb = ({ boardId }: MobileDetailGnbProps) => {
  const [activeModal, setActiveModal] = useState(false);
  const { data: boardDetailData } = useGetBoardDetail(boardId);
  const router = useRouter();
  const url = window.location.href;

  const modalPopUp = () => {
    setActiveModal((prev) => !prev);
  };

  return (
    <div className="w-full max-w-[687px] h-[48px] flex justify-between items-center bg-white border border-gray2 sticky top-0 z-10">
      <div className="w-full h-full flex items-center">
        <div
          onClick={() => router.push("/")}
          className="flex items-center justify-center w-[48px] h-[48px] p-[10px]"
        >
          <CustomIcon
            icon="MOBILE_ARROW_LEFT"
            className="w-[18px] h-[18px] text-white"
          />
        </div>
        <p className="w-full max-w-[216px] truncate font-bold text-[16px] leading-[26px] text-black">
          {boardDetailData?.data?.title}
        </p>
      </div>
      <div className="flex w-[96px] h-full items-center gap-x-[16px] py-[14px] px-[16px]">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <CustomIcon
            icon="MOBILE_DETAIL_GNB_REPORT_ICON"
            className="w-[18px] h-[18px] text-white"
          />
        </div>
        <div
          onClick={modalPopUp}
          className="w-[24px] h-[24px] flex items-center justify-center"
        >
          <CustomIcon
            icon="MOBILE_DETAIL_GNB_SHARE_ICON"
            className="w-[18px] h-[18px] text-white"
          />
        </div>
      </div>
      {activeModal && (
        <ShareModalPopUp setActiveModal={setActiveModal} url={url} />
      )}
    </div>
  );
};

export default MobileDetailGnb;

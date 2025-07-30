import React, { useState, useEffect } from "react";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { cn } from "@/utils";
import ShareModalPopUp from "@/app/_components/ShareModalPopUp";
import { useRouter } from "next/navigation";
import ReportModalPopUp from "@/app/_components/ReportModalPopUp";
import { ReportType } from "@/services/board/types/report";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import { FeedbackInfoType } from "@/app/(route)/customer/(route)/feedback/_types/FeedbackInfoType";

interface NewsDetailGnbProps {
  title: string;
  type?: "news" | "notice" | "feedback";
  data?: FeedbackContentType | FeedbackInfoType;
  id?: number;
}

const NewsDetailGnb = ({
  title,
  type = "news",
  data,
  id,
}: NewsDetailGnbProps) => {
  const [activeModal, setActiveModal] = useState(false);
  const [reportActiveModal, setReportActiveModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [guestModal, setGuestModal] = useState(false);
  const url = window.location.href;
  const router = useRouter();
  const adminRole = useAdminRole();

  const modalPopUp = () => {
    setActiveModal((prev) => !prev);
  };

  const titleText = () => {
    if (type === "news") {
      return title || "뉴스톡톡";
    } else if (type === "notice") {
      return title || "공지사항";
    } else if (type === "feedback") {
      return title || "개선요청";
    }
    return "";
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const reportData = {
    reportedPublicId: data?.publicId,
    reportType: "IMPROVEMENT" as ReportType,
    reportedContentId: Number(id),
  };

  const handleReportClick = () => {
    if (!adminRole) {
      setGuestModal(true);
    } else {
      setReportActiveModal(true);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-[48px] bg-white border-b border-gray2 flex items-center justify-between",
        isSticky ? "fixed top-0 left-0 z-10" : "absolute top-0 left-0 z-10",
        "pc:hidden tablet:hidden"
      )}
    >
      <div
        onClick={handleBackButtonClick}
        className="w-[48px] h-full flex items-center justify-center cursor-pointer"
      >
        <CustomIcon
          icon="MOBILE_ARROW_LEFT"
          className="w-[18px] h-[18px] text-white"
        />
      </div>
      <h1 className="font-bold text-[16px] leading-[26px] tracking-[-0.02em] text-black truncate w-full select-none">
        {titleText()}
      </h1>
      <div
        className={cn(
          "w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer",
          type === "feedback" && "w-[96px]"
        )}
      >
        {type === "feedback" && (
          <div onClick={handleReportClick} className="w-1/2">
            <CustomIcon
              icon="MOBILE_DETAIL_GNB_REPORT_ICON"
              className="w-[18px] h-[18px] text-white"
            />
          </div>
        )}
        <div onClick={modalPopUp} className="w-1/2">
          <CustomIcon
            icon="MOBILE_DETAIL_GNB_SHARE_ICON"
            className="w-[18px] h-[18px] text-white"
          />
        </div>
      </div>
      {guestModal && (
        <SignInModalPopUp
          isOpen={guestModal}
          onClose={() => setGuestModal(false)}
        />
      )}
      {reportActiveModal && (
        <ReportModalPopUp
          setActiveModal={setReportActiveModal}
          reportData={reportData}
        />
      )}
      {activeModal && (
        <ShareModalPopUp setActiveModal={setActiveModal} url={url} />
      )}
    </div>
  );
};

export default NewsDetailGnb;

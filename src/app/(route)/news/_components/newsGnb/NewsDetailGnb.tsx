import React, { useState, useEffect } from "react";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { cn } from "@/utils";
import ShareModalPopUp from "@/app/_components/ShareModalPopUp";
import { useRouter } from "next/navigation";

interface NewsDetailGnbProps {
  title: string;
}

const NewsDetailGnb = ({ title }: NewsDetailGnbProps) => {
  const [activeModal, setActiveModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const url = window.location.href;
  const router = useRouter();

  const modalPopUp = () => {
    setActiveModal((prev) => !prev);
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

  return (
    <div
      className={cn(
        "w-full h-[48px] bg-white border-b border-gray2 flex items-center justify-between",
        "pc:hidden",
        "tablet:hidden",
        isSticky ? "fixed top-0 left-0 z-10" : "absolute top-0 left-0 z-10"
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
      <h1 className="font-bold text-[16px] leading-[26px] tracking-[-0.02em] text-black truncate w-full">
        {title || "뉴스톡톡"}
      </h1>
      <div
        onClick={modalPopUp}
        className="w-[48px] h-full flex items-center justify-center cursor-pointer"
      >
        <CustomIcon
          icon="MOBILE_DETAIL_GNB_SHARE_ICON"
          className="w-[18px] h-[18px] text-white"
        />
      </div>
      {activeModal && (
        <ShareModalPopUp setActiveModal={setActiveModal} url={url} />
      )}
    </div>
  );
};

export default NewsDetailGnb;

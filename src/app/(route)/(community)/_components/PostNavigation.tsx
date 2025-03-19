"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface PostNavigationProps {
  scrollToCommentBar?: () => void;
  nextId?: number | null;
  previousId?: number | null;
}

const PostNavigation = ({
  scrollToCommentBar,
  nextId,
  previousId,
}: PostNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    setPrevDisabled(previousId === undefined || previousId === null);
    setNextDisabled(nextId === undefined || nextId === null);
  }, [nextId, previousId]);

  const nextButtonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-gray3 pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px]";
  const topButtonStyle =
    "min-w-[120px] h-[auto] min-h-[40px] flex items-center justify-center rounded-[5px] border-[1px] border-gray3 pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-[8px] font-[700] text-[14px] leading-[14px]";

  const handlePage = (type: "NEXT" | "PREV") => {
    const targetId = type === "NEXT" ? nextId : previousId;
    if (targetId === undefined || targetId === null) return;

    const pathSegments = pathname.split("/").filter(Boolean);
    pathSegments[pathSegments.length - 1] = targetId.toString();
    const newPath = `/${pathSegments.join("/")}`;
    router.push(newPath);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-[672px] min-h-[40px] flex justify-between">
      <div className="flex gap-2">
        <button
          onClick={() => handlePage("PREV")}
          className={`${nextButtonStyle} ${
            prevDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={prevDisabled}
        >
          <Arrow_up />
          이전글
        </button>
        <button
          onClick={() => handlePage("NEXT")}
          className={`${nextButtonStyle} ${
            nextDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={nextDisabled}
        >
          <Arrow_down />
          다음글
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={scrollToCommentBar} className={topButtonStyle}>
          <Arrow_up />
          댓글 맨위로
        </button>
        <button onClick={scrollToTop} className={topButtonStyle}>
          <Double_arrow_up />
          게시글 맨위로
        </button>
      </div>
    </div>
  );
};

export default PostNavigation;

"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface PostNavigationProps {
  scrollToCommentBar?: () => void;
  nextId: number;
  previousId: number;
  currentPath: string;
}

const PostNavigation = ({
  scrollToCommentBar,
  nextId,
  previousId,
  currentPath,
}: PostNavigationProps) => {
  const router = useRouter();

  const basePathArray = currentPath.split("/").slice(0, -1);
  const basePath = basePathArray.join("/");

  const onClick = (type: "prev" | "next") => {
    if (type === "next" && nextId) {
      return router.push(`${basePath}/${nextId}`);
    } else if (type === "prev" && previousId) {
      return router.push(`${basePath}/${previousId}`);
    }
  };

  const nextButtonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-gray3 pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px]";
  const topButtonStyle =
    "min-w-[120px] h-[auto] min-h-[40px] flex items-center justify-center rounded-[5px] border-[1px] border-gray3 pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-[8px] font-[700] text-[14px] leading-[14px]";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-[672px] min-h-[40px] flex justify-between",
        "mobile:hidden"
      )}
    >
      <div className="flex gap-2">
        <button
          onClick={() => onClick("prev")}
          className={`${nextButtonStyle} ${
            !previousId ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={!previousId}
        >
          <Arrow_up />
          이전글
        </button>
        <button
          onClick={() => onClick("next")}
          className={`${nextButtonStyle} ${
            !nextId ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={!nextId}
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

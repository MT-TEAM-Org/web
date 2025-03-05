"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PostNavigationProps {
  scrollToCommentBar?: () => void;
}

const PostNavigation = ({ scrollToCommentBar }: PostNavigationProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  // 추가 작업 필요, 현재 야구 페이지, 1 페이지에서만 작동
  const cachedData = queryClient.getQueryData([
    "newsDataList",
    "BASEBALL",
    "DATE",
    "DAILY",
    1,
  ]);

  console.log("cachedData: ", cachedData);

  const ids = Array.isArray(cachedData)
    ? cachedData.map((item) => item.id)
    : [];

  const pathnameId = pathname.split("/").pop();
  const num = Number(pathnameId);

  // 버튼 상태 설정
  useEffect(() => {
    if (!num) return;

    const currentIndex = ids.indexOf(num);
    setIsPrevDisabled(currentIndex <= 0); // 첫 번째 아이템이면 비활성화
    setIsNextDisabled(currentIndex === -1 || currentIndex >= ids.length - 1); // 마지막 아이템이면 비활성화
  }, [num, ids]);

  const onClick = (type: "prev" | "next") => {
    if (!num) return;

    const currentIndex = ids.indexOf(num);
    if (currentIndex === -1) return;

    if (type === "prev" && currentIndex > 0) {
      router.push(`/news/news-detail/${ids[currentIndex - 1]}`);
      return;
    }

    if (type === "next" && currentIndex < ids.length - 1) {
      router.push(`/news/news-detail/${ids[currentIndex + 1]}`);
      return;
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
    <div className="w-full max-w-[672px] min-h-[40px] flex justify-between">
      <div className="flex gap-2">
        <button
          onClick={() => onClick("prev")}
          className={`${nextButtonStyle} ${
            isPrevDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={isPrevDisabled}
        >
          <Arrow_up />
          이전글
        </button>
        <button
          onClick={() => onClick("next")}
          className={`${nextButtonStyle} ${
            isNextDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={isNextDisabled}
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

"use client";

import React, { useState } from "react";
import useGetGameEvent from "@/_hooks/fetcher/main/mainRightBar/useGetGameEvent";
import useGetMainRightBarNewsData from "@/_hooks/fetcher/main/mainRightBar/useGetMainRightBarNewsData";
import useIsTablet from "@/utils/useIsTablet";
import { cn } from "@/utils";
import useIsMobile from "@/utils/useIsMobile";
import MainRightBarPagination from "./MainRightBarPagination";
import { getRightBarTabs } from "../../_constants/RIGHT_BAR_TABS";
import MainRightTab from "./MainRightTab";
import MainRightPagination from "./MainRightPagination";
import MainContentSection from "./MainContentSection";

interface MainRightBarProps {
  isDesktop: boolean;
}

const MainRightBar = ({ isDesktop }: MainRightBarProps) => {
  const [pageNum, setPageNum] = useState(1);
  const [currentPage, setCurrentPage] = useState("1");
  const [buttonActive, setButtonActive] = useState(true);
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const skeletonCount = isMobile ? 3 : isTablet ? 3 : 5;
  const size = isMobile ? 3 : isTablet ? 3 : 5;

  // 게임 이벤트 데이터
  const {
    data: gameEventData,
    isLoading: eventIsLoading,
    isError: eventIsError,
    refetch: refetchGameEvent,
  } = useGetGameEvent({
    pageNum,
    size,
  });

  // 뉴스 데이터
  const {
    data: filteredNewsData,
    isLoading: newsIsLoading,
    isError: newsIsError,
    refetch: refetchNewsData,
  } = useGetMainRightBarNewsData({ page: currentPage, size });

  // 탭
  const tap = getRightBarTabs(setButtonActive, buttonActive);

  return (
    <div
      className={cn(
        "flex flex-col max-w-[298px] min-h-[668px] gap-4 bg-white rounded-[5px]",
        "tablet:max-w-full tablet:min-h-[396px]",
        "mobile:max-w-full mobile:min-h-fit",
        isDesktop
          ? "max-w-[298px] min-h-[696px] flex-1 mobile:max-w-full mobile:min-h-fit"
          : "tablet:block"
      )}>
      {/* 탭 */}
      <MainRightTab tap={tap} setButtonActive={setButtonActive} />

      {/* 내용 */}
      <MainContentSection
        buttonActive={buttonActive}
        data={{ filteredNewsData, gameEventData }}
        state={{ newsIsLoading, newsIsError, eventIsLoading, eventIsError }}
        skeletonCount={skeletonCount}
        refetch={{ refetchNewsData, refetchGameEvent }}
      />

      {/* 페이지네이션 */}
      <MainRightPagination
        buttonActive={buttonActive}
        filteredNewsData={filteredNewsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {!buttonActive &&
        (eventIsLoading || gameEventData?.content?.length > 0) && (
          <MainRightBarPagination
            pageNum={pageNum}
            setPageNum={setPageNum}
            currentPage={gameEventData?.pageInfo?.currentPage}
            totalPage={gameEventData?.pageInfo?.totalPage}
          />
        )}
    </div>
  );
};

export default MainRightBar;

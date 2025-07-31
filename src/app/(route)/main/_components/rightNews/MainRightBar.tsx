"use client";

import React, { useState } from "react";
import useGetGameEvent from "@/_hooks/fetcher/main/mainRightBar/useGetGameEvent";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import useGetMainRightBarNewsData from "@/_hooks/fetcher/main/mainRightBar/useGetMainRightBarNewsData";
import useIsTablet from "@/utils/useIsTablet";
import { cn } from "@/utils";
import useIsMobile from "@/utils/useIsMobile";
import RightNewsItemSkeleton from "@/app/(route)/(community)/_components/RightNewsItemSkeleton";
import EmptyGameBox from "../state/EmptyGameBox";
import RightNewsItem from "@/app/(route)/(community)/_components/RightNewsItem";
import EventItemSkeleton from "../state/EventItemSkeleton";
import EventItem, { GameEventData } from "../state/EventItem";
import MainRightBarPagination from "./MainRightBarPagination";

interface MainRightBarProps {
  isDesktop: boolean;
}

const style = {
  pageButtonStyle:
    "w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex justify-center items-center",
  disabledStyle: "opacity-50 cursor-not-allowed",
  btnStyle:
    "w-1/2 h-10 flex gap-[10px] px-[16px] py-[13px] items-center justify-center rounded-t-[5px] cursor-pointer border-gray8",
  activeBtnStyle:
    "border-[1px] border-b-0 font-[700] text-[14px] leading-[21px] text-gray7",
  passiveBtnStyle:
    "border-b border-b-gray5 border-gray5 font-[500] text-[14px] leading-[22px] text-gray5",
};

const MainRightBar = ({ isDesktop }: MainRightBarProps) => {
  const [pageNum, setPageNum] = useState(1);
  const [currentPage, setCurrentPage] = useState("1");
  const [buttonActive, setButtonActive] = useState(true);
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const skeletonCount = isMobile ? 3 : isTablet ? 3 : 5;
  const size = isMobile ? 3 : isTablet ? 3 : 5;

  const {
    data: gameEventData,
    isLoading: eventIsLoading,
    isError: eventIsError,
    refetch: refetchGameEvent,
  } = useGetGameEvent({
    pageNum,
    size,
  });

  const {
    data: filteredNewsData,
    isLoading: newsIsLoading,
    isError: newsIsError,
    refetch: refetchNewsData,
  } = useGetMainRightBarNewsData({ page: currentPage, size }) ?? {};

  const handleRefresh = () => {
    if (buttonActive) {
      refetchNewsData?.();
    } else {
      refetchGameEvent?.();
    }
  };

  const handleToPage = (type: "prev" | "next") => {
    const current = Number(currentPage);
    const total = filteredNewsData?.pageInfo?.totalPage ?? 1;
    if (type === "prev" && current > 1) {
      setCurrentPage(String(current - 1));
    } else if (type === "next" && current < total) {
      setCurrentPage(String(current + 1));
    }
  };

  const getNavButtonClass = (isDisabled: boolean) => {
    return `${style.pageButtonStyle} ${isDisabled ? style.disabledStyle : ""}`;
  };

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
      <div className="flex justify-center items-center min-w-[298px] min-h-[40px]">
        <button
          onClick={() => setButtonActive(true)}
          className={cn(
            style.btnStyle,
            buttonActive ? style.activeBtnStyle : style.passiveBtnStyle
          )}
          aria-label="뉴스 탭">
          뉴스
        </button>
        <button
          onClick={() => setButtonActive(false)}
          className={cn(
            style.btnStyle,
            !buttonActive ? style.activeBtnStyle : style.passiveBtnStyle
          )}
          aria-label="게임 이벤트 탭">
          게임 이벤트
        </button>
      </div>

      <div
        className={cn(
          "w-full h-auto max-h-[736px] flex flex-col gap-2",
          "tablet:min-w-[348px] tablet:max-h-[292px] tablet:overflow-hidden",
          "mobile:max-h-[292px] mobile:overflow-hidden"
        )}>
        {buttonActive ? (
          <>
            {newsIsLoading ? (
              <>
                {Array.from({ length: skeletonCount }).map((_, i) => (
                  <RightNewsItemSkeleton key={`news-skeleton-${i}`} />
                ))}
              </>
            ) : newsIsError || !filteredNewsData?.content?.length ? (
              <EmptyGameBox title="뉴스 정보" onClick={handleRefresh} />
            ) : (
              filteredNewsData.content.map((data: NewsItemType) => (
                <RightNewsItem
                  key={data.id}
                  newsItem={data}
                  wrapperWidth={298}
                  customClass={cn(
                    "max-w-[298px] h-[92px] border rounded-[5px] border-gray2 bg-white p-3",
                    "tablet:max-w-full tablet:min-w-[194px]",
                    "mobile:max-w-full"
                  )}
                />
              ))
            )}
          </>
        ) : (
          <>
            {eventIsLoading ? (
              <>
                {Array.from({ length: skeletonCount }).map((_, i) => (
                  <EventItemSkeleton key={`event-skeleton-${i}`} />
                ))}
              </>
            ) : eventIsError || !gameEventData?.content?.length ? (
              <EmptyGameBox title="게임 이벤트 정보" onClick={handleRefresh} />
            ) : (
              gameEventData.content.map((event: GameEventData) => (
                <EventItem key={event.id} gameEventData={event} />
              ))
            )}
          </>
        )}
      </div>

      {/* 페이지네이션 */}
      {buttonActive && filteredNewsData?.pageInfo?.totalPage > 1 && (
        <div className="w-[160px] min-h-[32px] flex mx-auto gap-4">
          <button
            onClick={() => handleToPage("prev")}
            className={getNavButtonClass(Number(currentPage) === 1)}
            disabled={currentPage === "1"}
            aria-label="이전 페이지">
            <Arrow_left width={18} height={18} />
          </button>
          <div className="w-[64px] h-[32px] font-[500] text-[14px] text-gray6 flex justify-center items-center">
            {currentPage} / {filteredNewsData?.pageInfo?.totalPage}
          </div>
          <button
            onClick={() => handleToPage("next")}
            className={getNavButtonClass(
              Number(currentPage) ===
                Number(filteredNewsData?.pageInfo?.totalPage)
            )}
            disabled={
              Number(currentPage) === filteredNewsData?.pageInfo?.totalPage
            }
            aria-label="다음 페이지">
            <Arrow_right width={18} height={18} />
          </button>
        </div>
      )}

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

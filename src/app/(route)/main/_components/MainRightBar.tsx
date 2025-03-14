import React, { useState } from "react";
import EventItem from "./EventItem";
import useGetGameEvent from "@/_hooks/fetcher/main/mainRightBar/useGetGameEvent";
import useGetGameDiscount from "@/_hooks/fetcher/main/mainRightBar/useGetGameDiscount";
import DiscountItem from "./DiscountItem";
import EmptyGameBox from "./EmptyGameBox";
import MainRightBarPagination from "./MainRightBarPagination";
import DiscountItemSkeleton from "./DiscountItemSkeleton";
import EventItemSkeleton from "./EventItemSkeleton";
const MainRightBar = () => {
  const [pageNum, setPageNum] = useState(1);
  const [buttonActive, setButtonActive] = useState(true);
  const { data: gameEventData, isLoading: eventIsLoading } = useGetGameEvent({
    pageNum,
  });
  const { data: gameDiscountData, isLoading: discoutIsLoading } =
    useGetGameDiscount({ pageNum });
  const handleButtonStyle = (value: boolean) => {
    setButtonActive(value);
  };
  const btnStyle =
    "w-1/2 h-10 flex gap-[10px] px-[16px] py-[13px] items-center justify-center rounded-t-[5px] cursor-pointer border-gray8";
  const activeBtnStyle =
    "border-[1px] border-b-0 font-[700] text-[14px] leading-[21px] text-gray7";
  const passiveBtnStyle =
    "border-b-2 border-gray5 font-[500] text-[14px] leading-[22px] text-gray5";
  return (
    <div className="flex flex-col w-[298px] min-h-[668px] gap-6 bg-white rounded-lg">
      <div className="flex justify-center items-center min-w-[298px] min-h-[40px] h-auto">
        <button
          onClick={() => handleButtonStyle(true)}
          className={`${btnStyle} ${
            buttonActive ? activeBtnStyle : passiveBtnStyle
          }`}
        >
          게임 할인정보
        </button>
        <button
          onClick={() => handleButtonStyle(false)}
          className={`${btnStyle} ${
            !buttonActive ? activeBtnStyle : passiveBtnStyle
          }`}
        >
          게임 이벤트
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {buttonActive ? (
          discoutIsLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <DiscountItemSkeleton key={index} />
            ))
          ) : gameDiscountData?.content?.length === 0 ? (
            <EmptyGameBox title={"할인정보"} />
          ) : (
            gameDiscountData?.content?.map((discount) => (
              <DiscountItem key={discount.id} gameDiscountData={discount} />
            ))
          )
        ) : eventIsLoading ? (
          Array.from({ length: 5 }, (_, index) => (
            <EventItemSkeleton key={index} />
          ))
        ) : gameEventData?.content?.length === 0 ? (
          <EmptyGameBox title={"이벤트 정보"} />
        ) : (
          gameEventData?.content?.map((event) => (
            <EventItem key={event.id} gameEventData={event} />
          ))
        )}
      </div>

      {buttonActive &&
        (discoutIsLoading || gameDiscountData?.content?.length > 0) && (
          <MainRightBarPagination
            pageNum={pageNum}
            setPageNum={setPageNum}
            currentPage={gameDiscountData?.pageInfo?.currentPage}
            totalPage={gameDiscountData?.pageInfo?.totalPage}
          />
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

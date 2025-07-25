import { cn } from "@/utils";
import React from "react";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import { NoticeItemType } from "@/app/(route)/customer/_types/NoticeItemType";
import { usePageChangeHandler } from "@/app/(route)/customer/_hooks/usePageChangeHandler";
import NoticeItemLoading from "../atoms/NoticeItemLoading";
import NoticeItemError from "../atoms/NoticeItemError";
import NoticeList from "../atoms/NoticeList";

interface NoticeListBoxProps {
  noticeListData: NoticeItemType;
  isLoading: boolean;
  isError: boolean;
  searchParams: URLSearchParams;
}

const NoticeListBox = ({
  noticeListData,
  isLoading,
  isError,
  searchParams,
}: NoticeListBoxProps) => {
  const handlePageChange = usePageChangeHandler(
    noticeListData?.PageInfo?.totalPage
  );
  return (
    <div
      className={cn(
        "w-[720px] h-auto rounded-[5px] bg-white mb-10",
        "tablet:w-full",
        "mobile:w-full mobile:mt-3 mobile:mb-0"
      )}
    >
      <NoticeItemLoading isLoading={isLoading} />
      <NoticeItemError isError={isError} noticeDataList={noticeListData} />
      <NoticeList noticeDataList={noticeListData} searchParams={searchParams} />

      {noticeListData?.PageInfo?.totalPage > 0 && (
        <div
          className={cn(
            "hidden",
            "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
          )}
        >
          <Pagination
            pageInfo={noticeListData?.PageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default NoticeListBox;

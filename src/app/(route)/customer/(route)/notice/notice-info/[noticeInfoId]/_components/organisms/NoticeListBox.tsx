import { cn } from "@/utils";
import React from "react";
import NoticeItemSkeleton from "../../../../_components/status/NoticeItemSkeleton";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";
import NoticeItem from "../../../../_components/items/NoticeItem";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";

interface NoticeListBoxProps {
  isLoading: boolean;
  isError: boolean;
  noticeListData: any; // TODO: 타입 정의
  searchParams: URLSearchParams;
  handlePageChange: (page: number) => void;
}

const NoticeListBox = ({
  isLoading,
  isError,
  noticeListData,
  searchParams,
  handlePageChange,
}: NoticeListBoxProps) => {
  return (
    <div
      className={cn(
        "w-[720px] h-auto rounded-[5px] bg-white mb-10",
        "tablet:w-full",
        "mobile:w-full mobile:mt-3 mobile:mb-0"
      )}
    >
      {/* state 수정 */}
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <NoticeItemSkeleton key={index} />
        ))
      ) : noticeListData?.content?.length === 0 || isError ? (
        <EmptyItem title="공지사항이" />
      ) : (
        noticeListData?.content?.map((noticeListData: NoticeContentType) => (
          <NoticeItem
            key={noticeListData.id}
            noticeData={noticeListData}
            searchString={searchParams.get("search")}
            searchType={searchParams.get("search_type")}
          />
        ))
      )}

      {noticeListData?.pageInfo?.totalPage > 0 && (
        <div
          className={cn(
            "hidden",
            "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
          )}
        >
          <Pagination
            pageInfo={noticeListData?.pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default NoticeListBox;

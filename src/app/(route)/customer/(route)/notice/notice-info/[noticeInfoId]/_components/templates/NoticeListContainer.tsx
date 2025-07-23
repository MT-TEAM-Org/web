import React from "react";
import NoticeItemSkeleton from "../NoticeInfoItemSkeleton";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";
import NoticeItem from "../../../../_components/items/NoticeItem";
import { cn } from "@/utils";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import NoticeListBox from "../organisms/NoticeListBox";

interface NoticeListContainerProps {
  isLoading: boolean;
  isError: boolean;
  noticeListData: any;
  adminChecker: "ADMIN" | "USER" | undefined;
  searchParams: any;
  handlePageChange: (page: number) => void;
}

const NoticeListContainer = ({
  isLoading,
  isError,
  noticeListData,
  adminChecker,
  searchParams,
  handlePageChange,
}: NoticeListContainerProps) => {
  return (
    <>
      {/* 툴바 */}
      <CustomerTalkToolbar
        showOptions={false}
        paginationData={noticeListData?.pageInfo}
        adminChecker={adminChecker}
      />

      {/* 리스트 */}
      <NoticeListBox
        isLoading={isLoading}
        isError={isError}
        noticeListData={noticeListData}
        searchParams={searchParams}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default NoticeListContainer;

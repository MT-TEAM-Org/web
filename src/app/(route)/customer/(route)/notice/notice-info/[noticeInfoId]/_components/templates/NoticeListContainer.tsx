import React from "react";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import NoticeListBox from "../organisms/NoticeListBox";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { noticeListConfig } from "@/app/(route)/customer/_types/noticeListConfig";

interface NoticeListContainerProps {
  adminRole: "ADMIN" | "USER" | undefined;
  searchParams: any;
}

const NoticeListContainer = ({
  adminRole,
  searchParams,
}: NoticeListContainerProps) => {
  const noticeOption: noticeListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
  };

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(noticeOption);

  return (
    <>
      {/* 툴바 */}
      <CustomerTalkToolbar
        showOptions={false}
        paginationData={noticeListData?.pageInfo}
        adminChecker={adminRole}
      />

      {/* 리스트 */}
      <NoticeListBox
        isLoading={isLoading}
        isError={isError}
        noticeListData={noticeListData}
        searchParams={searchParams}
      />
    </>
  );
};

export default NoticeListContainer;
